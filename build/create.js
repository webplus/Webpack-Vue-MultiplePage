require('shelljs/global')
var path = process.argv[2]
cp('-R', 'src/template/page', 'src/views/'+ path)