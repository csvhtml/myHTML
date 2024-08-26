import os
import glob

testFilePattern = 'testCases*.js'
outputFileName = 'testRun_BASIS.js'

def get_tc_files(directory):
    pattern = os.path.join(directory, testFilePattern)
    js_files = glob.glob(pattern)
    return js_files

def ReturnJSFunctionsFromFile(filepath):
    with open(filepath, 'r') as file:
        content = file.read()

    retNames = []; retParameters = []; i = 0
    searchString = 'function '; 
    slen = len(searchString)
    while i < len(content):                                                             # // since the content is long, while loop instead of index()
        if content[i:i+slen] == searchString and content[i+slen].isalnum():             # // functions starting with '_' shall be excluded
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

def JSCode_RunTestFunction(listofFunctionNames, listofFunctionParameters):
    lName = listofFunctionNames; lPara = listofFunctionParameters

    ret = 'function test_BASIS(divID, myTest) {' + '\n'
    for i in range(len(listofFunctionNames)):
        ret += '\t' + lName[i] + lPara[i] + '\n'
    ret += '\n\tmyTest.PrintResult(divID)\n}\n'
    return ret

def CreateTestRunFile(file_path, code):
    with open(file_path, "w") as file:
        file.write(code)

def join2lists(a = None, b = None):
    if a == None:
        a = [[], []]
    if b == None:
        b = [[], []]

    return [a[0]+b[0], a[1]+b[1]]


if __name__ == '__main__':
    egopath = os.path.dirname(os.path.abspath(__file__))
    filesTestCases = get_tc_files(egopath)

    a = [[], []]
    for file in filesTestCases:
        a = join2lists(a, ReturnJSFunctionsFromFile(file))
    
    code = JSCode_RunTestFunction(a[0], a[1])
    
    CreateTestRunFile(egopath + '\\' + outputFileName, code)





