::Egret一键打包工具
::version_1.1
@echo off&setlocal EnableDelayedExpansion
::获取文件夹名称
cd ..\..\
set lj=%cd%
set lj=%lj:\= %
for %%a in (%lj%) do set pack_name=%%a
cd release
cd bin-release
cd web
set release_path=%cd%

::复制原文件夹，重命名新文件夹
rd /q /s %pack_name%
echo d | xcopy /e 1 1-复制
rename 1-复制 %pack_name%

cd %pack_name%
rename index.html %pack_name%.html

cd ..\
::删除原压缩包，创建压缩包
del %pack_name%.zip
::"C:\Program Files\Bandizip\Bandizip.exe" a "%pack_name%.zip" "%pack_name%"
rar a -r -ep1 "%pack_name%.zip" "%pack_name%"
::把压缩包复制到根目录下