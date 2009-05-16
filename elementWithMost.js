/*
 * elementWithMost
 * (c) James Padolsey
 * http://james.padolsey.com
 *
 * Returns the element with the most specified direct children
 *     - Example usage: Determining which element contains
 *       a page's primary content; probably the one that
 *       contains the most <p> child nodes:
 *       
 *       elementWithMost('p');
 *       
 * If several containers contain the same amount then
 * the first is returned.
 */

function elementWithMost(tagName) {
    
    if (!tagName) {
        throw new Error('containerWithMost: tagName not specified');
    }
    
    var all = Array.prototype.slice.call(document.getElementsByTagName('*')),
        len = all.length,
        most = {
            elem: null,
            count: 0
        };
        
    while (len--) {
        
        var current = all[len],
            childNodes = current.childNodes;
        
        if (childNodes.length > most.count) {
            var cLength = childNodes.length,
                matchLength = 0;
            while (cLength--) {
                if (childNodes[cLength].nodeName.toLowerCase() === tagName) {
                    matchLength++;
                }
            }
            if (matchLength >= most.count) {
                most.count = matchLength;
                most.elem = current;
            }
        }
        
    }
    
    return most.elem;
    
}