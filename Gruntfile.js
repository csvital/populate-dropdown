/**
 * Created by hayatiibis on 03/07/2017.
 */
module.exports = function(grunt) {
    grunt.registerTask("default","",function () {
        grunt.log.write("This grunt task is pointless");
    })

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        cssmin: {
            combine: {
                files: {
                    'html/min/styles.min.css': ['html/css/style.css']
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'html/min/scripts.min.js': ['html/js/populate.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['cssmin','uglify']);
};