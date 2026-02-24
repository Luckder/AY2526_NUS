function mosaic(r1, r2, r3, r4) {
    
    return beside(stack(r4, r3), stack(r1, r2));//Copy-Pasted my Mosaic function 
    
}

  
function steps(s1, s2, s3, s4){
    
    return mosaic(s1,
                  scale_vertical(0.75, s2),
                  scale_vertical(0.5, s3),
                  scale_vertical(0.25, s4)
                  );
    
}

// Test
render(steps(unit_cube, unit_sphere,
             unit_pyramid, unit_cylinder));
             
//---------------------------------------------------------------------------------------------

function cone(n, shape){
    
    return n===1 ? shape : overlay_frac(1-(1/n),
                                        cone(n-1, scale_horizontal((1-(1/n)),
                                        shape)),
                                        shape
                                        );
    
}

// Tests
render(cone(4, unit_cylinder));
//For large values of n, heights of cylinders become clearer to see as equal
