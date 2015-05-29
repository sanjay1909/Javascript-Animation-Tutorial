module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });

    grunt.loadNpmTasks('grunt-react');


    grunt.initConfig({
        react: {
            single_file_output: {
                files: {
                    'react/app.js': 'react/app.jsx'
                }
            },

            dynamic_mappings: {
                files: [
                    {
                        expand: true,
                        cwd: 'react',
                        src: ['**/*.jsx'],
                        dest: 'react',
                        ext: '.js'
        }
      ]
            }
        },
    })

    // task setup
    grunt.registerTask('default', ['react']);
};
