module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });

    grunt.loadNpmTasks('grunt-react');


    grunt.initConfig({
        react: {
            single_file_output: {
                files: {
                    'react/EEM/app.js': 'react/ownership/app.jsx'
                }
            },

            dynamic_mappings: {
                files: [
                    {
                        expand: true,
                        cwd: 'react/ownership',
                        src: ['**/*.jsx'],
                        dest: 'react/ownership',
                        ext: '.js'
        }
      ]
            }
        },
    })

    // task setup
    grunt.registerTask('default', ['react']);
};
