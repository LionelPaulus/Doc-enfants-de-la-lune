# Doc-enfants-de-la-lune
Semaines intensives HETIC



### Installation

```
npm run hello
```

### Commands
- to create dist folder :
```
gulp build
```
- to launch localhost :
```
gulp
```

### Install the Linter 🙈
```
export PKG=eslint-config-airbnb;
npm info "$PKG" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG"
```
If you are on Atom : `apm install linter-eslint`
On Sublime, install this package : `SublimeLinter-contrib-eslint`

### For the SCSS Linter (Only Atom) 🙉
`apm install linter-sass-lint`
