var wall_position_buffer = [
    // left wall
    -4.5,  -4.0,  -2.0,
    -4.5, -4.0,  0.0,
    -4.5,  4.0,  -2.0,
    -4.5,  4.0,  0.0,
    // right wall
    4.5,  -4.0,  -2.0,
    4.5, -4.0,  0.0,
    4.5,  4.0,  -2.0,
    4.5,  4.0,  0.0,
];
var counter = 0;
for(let i=1; i<1000; i++)
{
    counter = 2*i;
    for(let j=0; j<24; j=j+3)
    {
        wall_position_buffer.push(wall_position_buffer[j], wall_position_buffer[j+1], wall_position_buffer[j+2]-counter);
    }
}
var wall_texture_buffer = [
    1.0,  0.0,
    0.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,

    1.0,  0.0,
    0.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
];
for(let i=1; i<1000; i++)
{
    for(let j=0; j<16; j=j+2)
    {
        wall_texture_buffer.push(wall_texture_buffer[j], wall_texture_buffer[j+1]);
    }
}
var wall_indices_buffer = [
    0, 1, 2,     1, 2, 3,
    4, 5 ,6,   5, 6, 7,
];
counter = 8;
for(let i=1; i<2000; i++)
{
    wall_indices_buffer.push(counter, counter+1, counter+2);
    wall_indices_buffer.push(counter+1, counter+2, counter+3);
    counter = counter + 4;
}