var police_flag = 0;
var police_position_buffer = [
    // head top
    0.1, 1.2, -0.02,
    -0.1, 1.2,  -0.02,
    0.1, 1.2,  0.02,
    -0.1, 1.2,  0.02, 

    // head left
    -0.1, 1.2,  0.02,
    -0.1, 1.2,  -0.02,
    -0.1, 1.0,  0.02,
    -0.1, 1.0,  -0.02,

    // head right
    0.1, 1.2,  0.02,
    0.1, 1.2,  -0.02,
    0.1, 1.0,  0.02,
    0.1, 1.0,  -0.02,

    // head back
    0.1, 1.2,  0.02,
    -0.1, 1.2,  0.02,
    0.1, 1.0,  0.02,
    -0.1, 1.0,  0.02,

    // body top 
    0.2, 1.0, -0.04,
    -0.2, 1.0,  -0.04,
    0.2, 1.0,  0.04,
    -0.2, 1.0,  0.04, 

    // body left
    -0.2, 1.0,  0.04,
    -0.2, 1.0,  -0.04,
    -0.18, 0.4,  0.04,
    -0.18, 0.4,  -0.04,

    // body right
    0.2, 1.0,  0.04,
    0.2, 1.0,  -0.04,
    0.18, 0.4,  0.04,
    0.18, 0.4,  -0.04,

    // body back
    0.2, 1.0, 0.04,
    -0.2, 1.0,  0.04,
    0.18, 0.4,  0.04,
    -0.18, 0.4,  0.04,
    
    // left leg left
    -0.18, 0.4,  0.04, 
    -0.18, 0.4,  0.02, 
    -0.18, 0.0,  0.04, 
    -0.18, 0.0,  0.02, 

    // left leg right
    -0.1, 0.4,  0.04,  
    -0.1, 0.4,  0.02, 
    -0.1, 0.0,  0.04, 
    -0.1, 0.0,  0.02,

    // left leg back
    -0.1, 0.4,  0.04,  
    -0.18, 0.4,  0.04, 
    -0.1, 0.0, 0.04, 
    -0.18, 0.0, 0.04,

    // right leg left
    0.1, 0.4,  0.04, 
    0.1, 0.4,  0.02, 
    0.1, 0.0,  0.04, 
    0.1, 0.0,  0.02, 

    // right leg right
    0.18, 0.4,  0.04,  
    0.18, 0.4,  0.02, 
    0.18, 0.0,  0.04, 
    0.18, 0.0,  0.02,

    // right leg back
    0.18, 0.4,  0.02,  
    0.1, 0.4,  0.02, 
    0.18, 0.0, 0.02, 
    0.1, 0.0, 0.02,
];
var police_texture_buffer =[
    0.0,  0.0,
    1.2,  0.0,
    0.0,  1.2,
    1.2,  1.2,
]; 
var police_indices_buffer = [
    0, 1, 2,   1, 2, 3,
];
var cnt = 4;
for(let i = 0; i<13; i++)
{
    police_texture_buffer.push(
        0.0,  0.0,
        1.2,  0.0,
        0.0,  1.2,
        1.2,  1.2,);
    police_indices_buffer.push(cnt, cnt+1, cnt+2, cnt+1, cnt+2, cnt+3);
    cnt += 4;
}