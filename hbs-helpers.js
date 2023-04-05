hbs.handlebars.registerHelper('neq', function(arg1, arg2, options) {
    //console.log("eq",arg1,arg2,(arg1==arg2))
    return (arg1 != arg2) ? true : false;
});

hbs.handlebars.registerHelper('eq', function(arg1, arg2, options) {
    //console.log("eq",arg1,arg2,(arg1==arg2))
    return (arg1 == arg2) ? true : false;
});