::===============================================================
:: The below program lists all files in the folder and subfolders
:: It stores the result to the file 'myfilelist.txt' of the current directory.
:: If the file 'myfilelist.txt' doesn't exist, it will be created.
::
:: Example for the following file: 'C:\Data\something\file.txt':
::    %%f = full path and filename (without extension), e. g. 'C:\Data\something\file'
::    %%~nf = filename only (without extension), e. g. 'file'
::    %%~xf = file extension, e. g. '.txt'
::
:: Modify the output (everything between 'echo ' and ' >> ' for your needs! 
::===============================================================

@echo off

for /r %%f in (*) do (
  echo [%%~nf%%~xf::%%f] >> myfilelist.txt
)