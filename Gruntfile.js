module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });

    grunt.loadNpmTasks('grunt-react');


    grunt.initConfig({
        react: {
            single_file_output: {
                files: {
                    'react/dataFlow/app.js': 'react/dataFlow/app.jsx'
                }
            },

            dynamic_mappings: {
                files: [
                    {
                        expand: true,
                        cwd: 'react/dataFlow',
                        src: ['**/*.jsx'],
                        dest: 'react/dataFlow',
                        ext: '.js'
        }
      ]
            }
        },
    })

    // task setup
    grunt.registerTask('default', ['react']);
};
