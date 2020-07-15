// //
// // initBuffers
// //
// // Initialize the buffers we'll need. For this demo, we just
// // have one object -- a simple three-dimensional cube.
// //
// function initBuffers(gl) {

//   // Create a buffer for the cube's vertex positions.

//   const positionBuffer = gl.createBuffer();

//   // Select the positionBuffer as the one to apply buffer
//   // operations to from here out.

//   gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

//   // var positions = [
//   //   //1st track
//   //   1.5, -2.0,  -2.0,
//   //   -1.5,  -2.0,  -2.0,
//   //   1.5,  -2.0,  0.0,
//   //   -1.5, -2.0,  0.0,

//   //   //2nd track
//   //   4.5, -2.0,  -2.0,
//   //   1.5,  -2.0,  -2.0,
//   //   4.5,  -2.0,  0.0,
//   //   1.5, -2.0,  0.0,

//   //   //3rd track
//   //   -1.5, -2.0,  -2.0,
//   //   -4.5,  -2.0,  -2.0,
//   //   -1.5,  -2.0,  0.0,
//   //   -4.5, -2.0,  0.0,
//   // ];
//   // var counter = 0;
//   // for(let i=1; i<100; i++)
//   // {
//   //     counter = 2*i;
//   //     for(let j=0; j<36; j=j+3)
//   //     {
//   //       positions.push(positions[j], positions[j+1], positions[j+2]-counter);
//   //     }
//   // }

//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

//   // set up texture coordinates
//   const textureBuffer = gl.createBuffer();

//   gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
//   // const texture_cord = [
//   //   0.0,  0.0,
//   //   1.0,  0.0,
//   //   0.0,  1.0,
//   //   1.0,  1.0,

//   //   0.0,  0.0,
//   //   1.0,  0.0,
//   //   0.0,  1.0,
//   //   1.0,  1.0,

//   //   0.0,  0.0,
//   //   1.0,  0.0,
//   //   0.0,  1.0,
//   //   1.0,  1.0,
//   //   //1.0,  1.0,
//   //   // 0.0,  1.0,
//   //   // // Top
//   //   // 0.0,  0.0,
//   //   // 1.0,  0.0,
//   //   // 1.0,  1.0,
//   //   // 0.0,  1.0,
//   //   // // Bottom
//   //   // 0.0,  0.0,
//   //   // 1.0,  0.0,
//   //   // 1.0,  1.0,
//   //   // 0.0,  1.0,
//   //   // // Right
//   //   // 0.0,  0.0,
//   //   // 1.0,  0.0,
//   //   // 1.0,  1.0,
//   //   // 0.0,  1.0,
//   //   // // Left
//   //   // 0.0,  0.0,
//   //   // 1.0,  0.0,
//   //   // 1.0,  1.0,
//   //   // 0.0,  1.0,
//   // ]
//   // for(let i=1; i<100; i++)
//   // {
//   //     for(let j=0; j<24; j=j+2)
//   //     {
//   //       texture_cord.push(texture_cord[j], texture_cord[j+1]);
//   //     }
//   // }
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texture_cord), gl.STATIC_DRAW);
//   // Now set up the colors for the faces. We'll use solid colors
//   // for each face.


//   const faceColors = [
//     [1.0,  0.0,  1.0,  1.0],    
//     [1.0,  1.0,  0.0,  1.0],
//     [0.0,  1.0,  0.0,  1.0],
//     [0.0,  0.0,  1.0,  1.0],
//     [0.0,  1.0,  1.0,  1.0],
//     [1.0,  0.0,  0.0,  1.0],
//   ];

//   // Convert the array of colors into a table for all the vertices.

//   var colors = [];

//   for (var j = 0; j < faceColors.length; ++j) {
//     const c = faceColors[j];
//     // Repeat each color four times for the four vertices of the face
//     colors = colors.concat(c, c, c, c);
//   }

//   const colorBuffer = gl.createBuffer();
//   gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

//   // Build the element array buffer; this specifies the indices
//   // into the vertex arrays for each face's vertices.

//   const indexBuffer = gl.createBuffer();
//   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

//   // This array defines each face as two triangles, using the
//   // indices into the vertex array to specify each triangle's
//   // position.

//   // const indices = [
//   //   0,  1,  2,      1,  2,  3,    // front
//   //   4,  5,  6,      5,  6,  7,    // Back
//   //   8,  9, 10,      9, 10, 11,    // top
//   // //  12, 13, 14,     12, 14, 15,    // bottom
//   // //  16, 17, 18,     16, 18, 19,    // right
//   // //  20, 21, 22,     20, 22, 23,    // left
//   // ];
//   // counter = 12;
//   // for(let i=1; i<100; i++)
//   // {
//   //     for(let j=0; j<6; j++)
//   //     {
//   //       indices.push(counter, counter+1, counter+2);
//   //       indices.push(counter+1, counter+2, counter+3);
//   //     }
//   //     counter = counter+4;
//   // }
//   // Now send the element array to GL

//   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
//       new Uint16Array(indices), gl.STATIC_DRAW);

//   return {
//     position: positionBuffer,
//     textureCoord: textureBuffer,
//     color: colorBuffer,
//     indices: indexBuffer,
//   };
// }



const fsSource = `
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    uniform sampler2D uSampler;

    void main(void) {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord);

      gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
    }
  `;