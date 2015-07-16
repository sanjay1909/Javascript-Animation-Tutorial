module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });

    grunt.loadNpmTasks('grunt-react');


    grunt.initConfig({
        react: {
            single_file_output: {
                files: {
                    'react/EEM/app.js': 'react/EEM/app.jsx'
                }
            },

            dynamic_mappings: {
                files: [
                    {
                        expand: true,
                        cwd: 'react/EEM',
                        src: ['**/*.jsx'],
                        dest: 'react/EEM',
                        ext: '.js'
        }
      ]
            }
        },
    })

    // task setup
    grunt.registerTask('default', ['react']);
};
