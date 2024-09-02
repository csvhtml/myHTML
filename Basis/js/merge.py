import os
import glob



def get_fileNames(directory, ending, filterString = ""):
    pattern = os.path.join(directory, '*' + ending)
    js_files_all = glob.glob(pattern)
    js_files = [fName for fName in js_files_all if (filterString not in fName or filterString == "")]
    return js_files

def ReturnJSFunctionsFrom(filepath = '', codeString = ''):
    assert(filepath == '' or codeString == '' and (filepath+codeString != ''))
    if filepath != '':
        with open(filepath, 'r') as file:
            content = file.read()
    if codeString != '':
        content = codeString

    retNames = []; retParameters = []; i = 0
    searchString = 'function '; 
    slen = len(searchString)
    while i < len(content):                                                             # // since the content is long, while loop instead of index()
        if content[i:i+slen] == searchString and content[i+slen].isalnum():             # // functions starting with '_' shall be excluded
            i += slen
            idxFunctionNameStart = i
            while i < len(content) and (content[i].isalnum() or content[i] == '_'):
                i += 1 
            function_name = content[idxFunctionNameStart:i]
            idxParameterStart = i
            while i < len(content) and content[i] != ')':
                i += 1
            parameter_name = content[idxParameterStart:i+1]
            if parameter_name[:2] == '({' and parameter_name[-2:] == '})':
                parameter_name = '(dicct = {})'

            retNames.append(function_name)
            retParameters.append(parameter_name)
        i += 1
    return [retNames, retParameters]

def JSCode_FunctionsDictionary(dictName, listofFunctionNames, listofFunctionParameters):
    lName = listofFunctionNames; lPara = listofFunctionParameters
    def func(a): return RemoveDefaultValuesFromParameterString(a)

    ret = 'const ' + dictName + ' = {' + '\n'
    for i in range(len(listofFunctionNames)):
    # for fname in listofFunctionNames:
        ret += '\t' + lName[i] + ': function' + lPara[i] + ' {return ' + lName[i] + func(lPara[i])+ '},\n'
    ret += '};\n\n'
    return ret

def mergeTextFiles(files):
    merged_content = ''

    for file in files:
        with open(file, 'r', encoding='utf-8') as f:
            merged_content += f.read() + '\n'

    return merged_content

def RemoveDefaultValuesFromParameterString(parameterString):
    if not ' = ' in parameterString:
        return parameterString
    
    idx1 = parameterString.find(' = ')
    idx2 = parameterString.find(', ', idx1)
    if idx2 == -1:
        idx2 = parameterString.find(')', idx1)
    
    parameterString = parameterString[:idx1] + parameterString[idx2:]
    return parameterString

def AddFunctionDictionaryToMergedFile(file_path, code):
    with open(file_path, "r") as file:
        original_content = file.read()
    
    with open(file_path, "w") as file:
        file.write(code + '\n' + original_content)
    
    # return code + '\n' + original_content

def WriteToFile(file_path, content):
    with open(file_path, "w", encoding='utf-8') as file:
        file.write(content)

def AddFunctionTrace(content):
    searchString = 'function '; 
    traceString = '\n\tTraceFunctionCalls.pushX(arguments.callee.name)'
    slen = len(searchString); tlen = len(traceString); i = 0
    while i < len(content):                                                             
        if content[i:i+slen] == searchString and (content[i+slen].isalnum() or content[i] == '_'): 
            flag = True; i += slen
            for skip in ['IsEqual', 'IsListEqualSize', 'typOf']:
                if content[i:i+len(skip)] == skip:
                    flag = False
            while i < len(content) and content[i:i+4] != ') {\n':
                i += 1
            
            if flag:
                content = content[:i+3] + traceString + content[i+3:]
            i += tlen
        i += 1

    return content 
    

fileEnding = '.js'
MergeString = 'All_'
TraceString = 'TestTrace_'

if __name__ == '__main__':
    egopath = os.path.dirname(os.path.abspath(__file__))
    parentpath = egopath
    if parentpath.endswith(fileEnding.lstrip('.')):
        parentpath = os.path.dirname(parentpath)
    folder_name = os.path.basename(parentpath)
    output_file = folder_name + " " + MergeString + fileEnding
    output_fileTrace = folder_name + " " + MergeString + TraceString +  fileEnding
    # egopath = 'C:\\git\\myHTML\\Basis\\js'
    # parentpath = 'C:\\git\\myHTML\\Basis\\'
    # folder_name = 'Basis'
    # output_file = 'Basis All_.js'
    # output_fileTrace = 'Basis All_Trace_.js'

    files_to_merge = get_fileNames(egopath, fileEnding, MergeString)
    codeMergedJS = mergeTextFiles(files_to_merge)
    listFunctPara = ReturnJSFunctionsFrom(filepath='', codeString = codeMergedJS)    # egopath + "\\" + output_file

    codeFunctionDictionary = JSCode_FunctionsDictionary(folder_name.upper(), listFunctPara[0], listFunctPara[1])
    
    codeAll = codeFunctionDictionary + '\n' + codeMergedJS
    WriteToFile(egopath + "\\" + output_file, codeAll)

    codeMergedTraceJS = codeFunctionDictionary + '\n' + AddFunctionTrace(codeMergedJS)
    WriteToFile(egopath + "\\" + output_fileTrace, codeMergedTraceJS)


