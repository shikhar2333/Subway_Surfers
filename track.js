var track_position_buffer = [
    //1st track
    1.5, 0.0,  -4.0,
    -1.5,  0.0,  -4.0,
    1.5,  0.0,  0.0,
    -1.5, 0.0,  0.0,

    //2nd track
    4.5, 0.0,  -4.0,
    1.5,  0.0,  -4.0,
    4.5,  0.0,  0.0,
    1.5, 0.0,  0.0,

    //3rd track
    -1.5, 0.0,  -4.0,
    -4.5,  0.0,  -4.0,
    -1.5,  0.0,  0.0,
    -4.5, 0.0,  0.0,
  ];
  var counter = 0;
  for(let i=1; i<500; i++)
  {
      counter = 4*i;
      for(let j=0; j<36; j=j+3)
      {
         track_position_buffer.push(track_position_buffer[j], track_position_buffer[j+1], track_position_buffer[j+2]-counter);
      }
  }
  var track_texture_buffer = [
    0.0,  0.0,
    1.0,  0.0,
    0.0,  1.0,
    1.0,  1.0,

    0.0,  0.0,
    1.0,  0.0,
    0.0,  1.0,
    1.0,  1.0,

    0.0,  0.0,
    1.0,  0.0,
    0.0,  1.0,
    1.0,  1.0,
  ];
  for(let i=1; i<1000; i++)
  {
      for(let j=0; j<24; j=j+2)
      {
        track_texture_buffer.push(track_texture_buffer[j], track_texture_buffer[j+1]);
      }
  }
  const track_indices_buffer = [
    0,  1,  2,      1,  2,  3,    // 1st
    4,  5,  6,      5,  6,  7,    // 2nd
    8,  9, 10,      9, 10, 11,    // 3rd
  ];
  counter = 12;
  for(let i=1; i<1000; i++)
  {
      track_indices_buffer.push(counter, counter+1, counter+2);
      track_indices_buffer.push(counter+1, counter+2, counter+3);

      counter+=4;
      track_indices_buffer.push(counter, counter+1, counter+2);
      track_indices_buffer.push(counter+1, counter+2, counter+3);
      counter+=4;

      track_indices_buffer.push(counter, counter+1, counter+2);
      track_indices_buffer.push(counter+1, counter+2, counter+3);

      counter = counter+4;
  }