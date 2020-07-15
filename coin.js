var coin_position_buffer = [
    //body top 
    0.1, 0.6, -0.04,
    -0.1, 0.6,  -0.04,
    0.1, 0.6,  0.04,
    -0.1, 0.6,  0.04, 

    // body left
    -0.1, 0.6,  0.04,
    -0.1, 0.6,  -0.04,
    -0.1, 0.0,  0.04,
    -0.1, 0.0,  -0.04,

    // body right
    0.1, 0.6,  0.04,
    0.1, 0.6,  -0.04,
    0.1, 0.0,  0.04,
    0.1, 0.0,  -0.04,

    // body back
    0.1, 0.6, 0.04,
    -0.1, 0.6,  0.04,
    0.1, 0.0,  0.04,
    -0.1, 0.0,  0.04,
    
];
console.log(coin_position_buffer.length);
var coin_indices_buffer = [
    0, 1, 2,   1, 2, 3,
    4, 5, 6,   5, 6, 7,
    8, 9, 10,   9, 10, 11,
    12, 13, 14,   13, 14, 15,
];
var coin_texture_buffer = [
    0.0, 0.0,
    1.0, 0.0,
    0.0, 1.0,
    1.0, 1.0,

    0.0, 0.0,
    1.0, 0.0,
    0.0, 1.0,
    1.0, 1.0,

    0.0, 0.0,
    1.0, 0.0,
    0.0, 1.0,
    1.0, 1.0,

    0.0, 0.0,
    1.0, 0.0,
    0.0, 1.0,
    1.0, 1.0,
];
// let count;
// var x_change = 3.0;
// var rand_coins = getRandomInt(21);
// //console.log(rand_coins);
// var i, j;
// for(i = 1; i<200; i++)
// {
//     count = 2*i;
//     for(j = 0; j<48; j = j+3)
//     {
//         //console.log(j);
//         coin_position_buffer.push(coin_position_buffer[j] + x_change, coin_position_buffer[j+1], coin_position_buffer[j+2] - count);
//     }
//     //console.log(coin_position_buffer.length);
//     if(i%rand_coins==0)
//     {
//         x_change = (getRandomInt(2)-1)*3.0;
//         rand_coins = getRandomInt(21);
//     }
// }
// for(i = 1; i<200; i++)
// {
//     for(j = 0; j<32; j = j + 2)
//     {
//         coin_texture_buffer.push(coin_texture_buffer[j], coin_texture_buffer[j+1]);
//     }
// }
// var cnt = 16;
// for(i = 1; i<200; i++)
// {
//     for(j = 0; j<4; j++)
//     {
//         coin_indices_buffer.push(cnt, cnt+1, cnt+2, cnt+1, cnt+2, cnt+3);
//         cnt = cnt + 4;
//     }
// }
// function getRandomInt(max)
// {
//     return Math.floor(Math.random() * Math.floor(max));
// }