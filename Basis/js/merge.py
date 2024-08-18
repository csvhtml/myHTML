import os
import glob

fileEnding = '.js'

def get_js_files(directory):
    pattern = os.path.join(directory, '*' + fileEnding)
    js_files = glob.glob(pattern)
    return js_files

def ReturnJSFunctionsFromFile(filepath):
    with open(filepath, 'r') as file:
        content = file.read()

    retNames = []; retParameters = []; i = 0
    searchString = 'function '; 
    slen = len(searchString)
    # since the content is long, whilse loop instead of index()
    while i < len(content):
        if content[i:i+slen] == searchString and content[i+slen].isalnum():
            i += 9
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
    ret = 'const ' + dictName + ' = {' + '\n'
    for i in range(len(listofFunctionNames)):
    # for fname in listofFunctionNames:
        ret += '\t' + listofFunctionNames[i] + ': function' + listofFunctionParameters[i] + ' {return ' + listofFunctionNames[i] + listofFunctionParameters[i]+ '},\n'
    ret += '};\n\n'
    return ret

def merge_js_files(files, output_file):
    merged_content = ''

    for file in files:
        with open(file, 'r', encoding='utf-8') as f:
            merged_content += f.read() + '\n'

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(merged_content)

def AddFunctionDictionaryToMergedFile(file_path, code):
    with open(file_path, "r") as file:
        original_content = file.read()
    
    with open(file_path, "w") as file:
        file.write(code + '\n' + original_content)

if __name__ == '__main__':
    egopath = os.path.dirname(os.path.abspath(__file__))
    parentpath = egopath
    if parentpath.endswith(fileEnding.lstrip('.')):
        parentpath = os.path.dirname(parentpath)
    folder_name = os.path.basename(parentpath)

    files_to_merge = get_js_files(egopath)
    output_file = folder_name + " All_" + fileEnding
    if (egopath + "\\" + output_file in files_to_merge):
        files_to_merge.remove(egopath + "\\" + output_file)
    
    merge_js_files(files_to_merge, egopath + "\\" + output_file)

    a = ReturnJSFunctionsFromFile(egopath + "\\" + output_file)

    b = JSCode_FunctionsDictionary(folder_name.upper(), a[0], a[1])

    AddFunctionDictionaryToMergedFile(egopath + "\\" + output_file, b)


