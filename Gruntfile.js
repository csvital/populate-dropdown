/**
 * Created by hayatiibis on 03/07/2017.
 */
module.exports = function(grunt) {
    grunt.registerTask("default","",function () {
        grunt.log.write("This grunt task is pointless");
    })

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // cssmin: {
        //     combine: {
        //         files: {
        //             'min/styles.min.css': ['select2/select2.css']
        //         }
        //     }
        // },
        uglify: {
            dist: {
                files: {
                    'min/scripts.min.js': ['js/populate.js']
                }
            }
        }
    });

    //grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //grunt.registerTask('default', ['cssmin','uglify']);
    grunt.registerTask('default', ['uglify']);
};