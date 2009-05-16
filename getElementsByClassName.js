/*
 * getElementsByClassName
 * (c) James Padolsey
 * http://james.padolsey.com
 */

function getElementsByClassName(className, tagName, context) {
    
    if (!className) {
        throw new Error('getElementsByClassName: className not specified');
    }
    
    var all = (context || document).getElementsByTagName(tagName || '*'),
        out = [];
    
    for (var i = 0, l = all.length; i < l; i++) {
        if ( (' ' + all[i].className + ' ').indexOf(' ' + className + ' ') > -1 ) {
            out[out.length] = all[i];
        }
    }
    
    return out;
    
}