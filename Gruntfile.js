module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),
    uglify: {
      options: {
        banner: '/* <%= grunt.template.today("yyyy-mm-dd") %> / '
      },
      dev: {
        options: {
          bucket: 'wsjung0516.github.io'
        },
        files: [
          { dest: '/', action: 'delete' },
/*
          { expand: true, cwd: 'dist', src: ['**'], dest: '', action: 'upload' }
*/
        ]
      }
    },
    typescript: {
      base: {
        src: [
          'typings/tsd.d.ts',
          'dev/components/*.ts',
          'dev/app.ts'
        ],
        dest:'build',
        options: {
          target:'ES5',
          module:'commonjs',
          sourceMap:true,
          watch: {
            after: ['copy'],
            atBegin: true
          }
        }
      }
    },
    copy: {
      main: {
        files:[
          {   expand: true,
            src: 'dev/templates/*',
            dest: 'build/templates/',
            flatten: true,
            filter: 'isFile'
          },
          {
            expand: true,
            src: 'dev/index.html',
            dest: 'build/',
            flatten: true,
            filter: 'isFile'
          }
        ]

      }
    }
  });
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask("dev-up", ['uglify:dev']);
};
