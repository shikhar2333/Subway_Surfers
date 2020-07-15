var cube = [
    // Front face
    0.4, 0.6, -0.04,
    -0.4, 0.6,  -0.04,
    0.4, 0.6,  0.04,
    -0.4, 0.6,  0.04, 

    // body left
    -0.4, 0.6,  0.04,
    -0.4, 0.6,  -0.04,
    -0.4, 0.0,  0.04,
    -0.4, 0.0,  -0.04,

    // body right
    0.4, 0.6,  0.04,
    0.4, 0.6,  -0.04,
    0.4, 0.0,  0.04,
    0.4, 0.0,  -0.04,

    // body back
    0.4, 0.6, 0.04,
    -0.4, 0.6,  0.04,
    0.4, 0.0,  0.04,
    -0.4, 0.0,  0.04,
];
var cube_texture = [];
for(let i=0; i<6; i++)
{
    cube_texture.push(
        0.0,  0.0,
        1.0,  0.0,
        0.0,  1.0,
        1.0,  1.0);
}
var cube_indices = [];
var cnt = 0;
for(let i=0; i<4; i++)
{
    cube_indices.push(cnt, cnt+1, cnt+2, cnt+1, cnt+2, cnt+3);
    cnt+=4;
} 