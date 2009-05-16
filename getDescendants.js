/*
 * getDescendants
 * (c) James Padolsey
 * http://james.padolsey.com
 *
 * Returns descendents of a specified element
 *     - A depth must be specified.
 *     - The function will search to this depth.
 *     
 * getDescendants( element, 1 ); // children
 * getDescendants( element, 2 ); // children + grandchildren
 * getDescendants( element, 3 ); // children + grandchildren + great-grandchildren
 */

function getDescendants(context, depth) {
    
    if (!context) {
        throw new Error('getDescendants: context not specified');
    }
    
    if (!depth){ return []; }
    
    var getDescendants = arguments.callee,
        out = [],
        clean = function(collection) {
            
            // Remove non-element nodes.
            var cleansed = [];
            for ( var i = 0, l = collection.length; i < l; i++ ) {
                if (collection[i].nodeType === 1) {
                    cleansed[cleansed.length] = collection[i];
                }
            }
            return cleansed;
        
        },
        add = function(collection) {
            
            // Clean and add collection to stack.
            out = out.concat(clean(collection));
            
        },
        childNodes = context.childNodes;

    // Start by adding just the childNodes.
    add(childNodes);
    
    // Run getDescendants on all childNodes, decrementing depth.
    for ( var i = 0, l = childNodes.length; i < l; i++ ) {
        add(getDescendants(childNodes[i], depth - 1));
    }

    return out;
    
}