开发过程中，会在 `.gitignore` 文件中添加一些忽略项，然而每次使用 `git status` 的时候都未列在 untracked 中，比如用 IDEA 开发，`.idea` 文件夹添加到该文件，再提交还是会提示。

`.gitignore` 文件是用来忽略开发者想忽略掉的文件或目录，如果没有 `.gitignore` 文件，可以自己手动创建。在 `.gitignore` 文件中的每一行保存一个匹配的规则。例如：

```shell
*.a       # 忽略所有 .a 结尾的文件
!lib.a    # 但 lib.a 除外
/TODO     # 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
node_modules
.project
.vscode
build/    # 忽略 build/ 目录下的所有文件
doc/*.txt # 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
**/node_modules # ** 忽略多层文件夹
```

由于新建的文件在 git 中会有缓存，某些文件已经被纳入了版本管理中，就算是在 `.gitignore` 中已经声明了忽略路径也是不起作用的，这时候应该先把本地缓存删除，然后再进行 `git push`，这样就不会出现忽略的文件了。

```shell
git rm -r --cached .
git add .
git commit -m 'update .gitignore'
```

