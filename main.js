var cubeRotation = 0.0;
var track, player, wall, train_sides, coin, arrow, police, uparrow, cube;
var coins_draw = [], arrows_draw = [], trains_draw = [], uparrows_draw = [], jumpboost_draw = [];
var coins_up = [];
var initial_height;
var change_x = 0, init_x;
var score;
var police_speed = 0.01;
var deltaTime;
var t = [], t1 = [];
var count_score = 0;
var flash_light = false; 
var count = 100;
var cnt = 0;
var press_fl = 0;
var fly_height = 4;
var prev = 0;
var train_top = 0;
var jumper_boost = [];
var prev1 = 0;
main();

function main()
{
  score = document.getElementById('score');
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  track = new Track(gl, [0, -2.0, -6.0], track_position_buffer, track_texture_buffer, track_indices_buffer, 'track.jpeg');
  player = new Player(gl, [0, -2.0, -8.0], player_position_buffer, player_texture_buffer, player_indices_buffer, 'black.jpg');
  console.log("Playerx:"+player.pos[0]);
  console.log("Playery:"+player.pos[1]);
  console.log("Playerz:"+player.pos[2]);
  wall = new Wall(gl, [0, -2.1, 0.0], wall_position_buffer, wall_texture_buffer, wall_indices_buffer, 'wall.jpg');
  track.height = 0;
  track.width = 9;
  track.depth = 800; 
  train_sides = new Train(gl, [0, -2.0, -35.0], train_position_buffer, train_texture_buffer, train_indices_buffer, 'train_side.jpg');
  coin = new Coin(gl, [0.0, -2.0, -24.0], coin_position_buffer, coin_texture_buffer, coin_indices_buffer, 'gold.jpg');
  arrow = new object(gl, [0.0, -2.0, -24.0], arrow_position_buffer, arrow_texture_buffer, arrow_indices_buffer, 'arrow.png');
  uparrow = new object(gl, [0.0, -2.0 + 0.7, -30.0], arrow_position_buffer, arrow_texture_buffer, arrow_indices_buffer, 'uparrow.jpg');
  cube = new object(gl, [0.0, -2.0 , -50.0], arrow_position_buffer, arrow_texture_buffer, arrow_indices_buffer, 'boost.jpg');
  cube1 = new object(gl, [0.0, -2.0 , -25.0], arrow_position_buffer, arrow_texture_buffer, arrow_indices_buffer, 'train_front.jpg');
  jumper_boost.push(cube1);
  jumpboost_draw.push(cube);
  jumpboost_draw[1] = new object(gl, [(getRandomInt(3)-1)*3.0, -2.0 , -50.0], arrow_position_buffer, arrow_texture_buffer, arrow_indices_buffer, 'boost.jpg');
  jumper_boost[1] = new object(gl, [(getRandomInt(3)-1)*3.0, -2.0 , -25.0], arrow_position_buffer, arrow_texture_buffer, arrow_indices_buffer, 'train_front.jpg');
  jumpboost_draw[1].pos[0] = (getRandomInt(3)-1)*3.0;
  jumpboost_draw[1].pos[2] = jumpboost_draw[0].pos[2]-50;
  jumper_boost[1].pos[0] = (getRandomInt(3)-1)*3.0;
  jumper_boost[1].pos[2] = jumper_boost[0].pos[2]-(getRandomInt(3)-1)*10;
  initial_height = player.pos[1];
  init_x = player.pos[0];
  arrows_draw.push(arrow);
  coins_up.push( new Coin(gl, [0.0, 2.0, -24.0], coin_position_buffer, coin_texture_buffer, coin_indices_buffer, 'gold.jpg')  );
  coins_draw.push(coin);
  trains_draw.push(train_sides);
  uparrows_draw.push(uparrow);
  player.height = 1.2;
  player.width = 0.4;
  player.depth = 0.08;
  for(let i=0; i<2; i++)
  {
    jumpboost_draw[i].height = 0.6;
    jumpboost_draw[i].width = 0.8;
    jumpboost_draw[i].depth = 0.08;
    jumper_boost[i].height = 0.6;
    jumper_boost[i].width = 0.8;
    jumper_boost[i].depth = 0.08;
  }
  for (let i =1;i<10;i++)
  {
    //console.log(coins_draw[i].pos);
    coins_draw[i] = new Coin(gl, [0.0, -2.0, -24.0], coin_position_buffer, coin_texture_buffer, coin_indices_buffer, 'gold.jpg');
    arrows_draw[i] = new object(gl, [0.0, -2.0, -24.0], arrow_position_buffer, arrow_texture_buffer, arrow_indices_buffer, 'arrow.png');
    trains_draw[i] = new Train(gl, [0, -2.0, -35.0], train_position_buffer, train_texture_buffer, train_indices_buffer, 'train_side.jpg');
    uparrows_draw[i] = new object(gl, [0, -2.0 + 0.7, -30.0], arrow_position_buffer, arrow_texture_buffer, arrow_indices_buffer, 'uparrow.jpg');
    coins_up[i] = new Coin(gl, [0.0, 2.0, -24.0], coin_position_buffer, coin_texture_buffer, coin_indices_buffer, 'gold.jpg')  ;
  }
  var x_change;
  for(let i =1; i<10; i++)
  {
    x_change = (getRandomInt(3)-1)*3.0;
    coins_draw[i].pos[0] = x_change;
    coins_draw[i].pos[2] = coins_draw[i-1].pos[2] - 2; 
    coins_up[i].pos[0] = x_change;
    coins_up[i].pos[2] = coins_up[i-1].pos[2] - 10;
  }
  for(let i=1; i<10; i++)
  {
    x_change = (getRandomInt(3)-1)*3.0;
    arrows_draw[i].pos[0] = x_change;
    arrows_draw[i].pos[2] = arrows_draw[i-1].pos[2] - 15;
    uparrows_draw[i].pos[0] = x_change;
    uparrows_draw[i].pos[2] = uparrows_draw[i-1].pos[2] - 50;
  }
  for(let i=1; i<10; i++)
  {
    x_change = (getRandomInt(3)-1)*3.0;
    trains_draw[i].pos[0] = x_change;
    trains_draw[i].pos[2] = arrows_draw[i-1].pos[2] - 60;
  }
  for(let i=0; i<10; i++)
  {
    coins_draw[i].height = 0.6;
    coins_draw[i].width = 0.2;
    coins_draw[i].depth = 0.08;
    coins_up[i].height = 0.6;
    coins_up[i].width = 0.2;
    coins_up[i].depth = 0.08;
    arrows_draw[i].height = 0.6;
    arrows_draw[i].width = 0.8;
    arrows_draw[i].depth = 0.08;
    uparrows_draw[i].height = 0.6;
    uparrows_draw[i].width = 0.8;
    uparrows_draw[i].depth = 0.08;
    trains_draw[i].height = 1.2;
    trains_draw[i].width = 0.8;
    trains_draw[i].depth = 8;
  }
  police = new object(gl, [0.0, -2.0, -6.0], police_position_buffer, police_texture_buffer, police_indices_buffer, 'police.jpg');
  if (!gl) 
  {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }
  // Vertex shader program

  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec2 aTextureCoord;
    attribute vec4 aVertexColor;
    attribute vec3 aVertexNormal;

    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;


    varying lowp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;
      highp vec3 ambientLight = vec3(0.4, 0.4, 0.4);
      highp vec3 directionalLightColor = vec3(1, 1, 1);
      highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

      highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

      highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      vLighting = ambientLight + (directionalLightColor * directional);
    }
  `;

  const vsSource1 = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;

    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;

      // Apply lighting effect

      highp vec3 ambientLight = vec3(0.6, 0.8, 0.7);
      highp vec3 directionalLightColor = vec3(1, 1, 1);
      highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

      highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

      highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      vLighting = ambientLight + (directionalLightColor * directional);
    }
  `;
  // const fsSource = `
  //   uniform sampler2D uSampler;
    
  //   varying highp vec2 vTextureCoord;
  //   varying highp vec3 vLighting;
  //   void main(void) {
  //     gl_FragColor = texture2D(uSampler, vTextureCoord);
  //   }
  // `;

  // const fsSource1 = `
  //   uniform sampler2D uSampler;

  //   varying highp vec2 vTextureCoord;
  //   varying highp vec3 vLighting;
  //   void main(void) {
  //     highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
  //     highp vec3 Image = vec3(texelColor.r+0.3,texelColor.g+0.3,texelColor.b+0.3);
  //     gl_FragColor = vec4(Image * vLighting, texelColor.a);
  //   }
  // `;
  const fsSource2 = `
    uniform sampler2D uSampler;
    
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;
    void main(void) {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
      gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
      precision highp float;
      float m = (gl_FragColor.r + gl_FragColor.g + gl_FragColor.b)/3.0;
      gl_FragColor = vec4(m,m,m,1.0);
    }
  `;

  const fsSource = `
  uniform sampler2D uSampler;
  
  varying highp vec2 vTextureCoord;
  varying highp vec3 vLighting;
  void main(void) {
    highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
    gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
  }
`;



  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
  const  shaderProgram1 = initShaderProgram(gl, vsSource1, fsSource);

  const shaderProgram2 = initShaderProgram(gl, vsSource, fsSource2);
  const shaderProgram3 = initShaderProgram(gl, vsSource1, fsSource2);
  //const shaderProgram1 = initShaderProgram(gl, vsSource1, fsSource1);
  
  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVevrtexColor and also
  // look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
      vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
      textureCoordLocation: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
    },
  };
  const programInfo1 = {
    program: shaderProgram1,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram1, 'aVertexPosition'),
      vertexNormal: gl.getAttribLocation(shaderProgram1, 'aVertexNormal'),
      textureCoordLocation: gl.getAttribLocation(shaderProgram1, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram1, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram1, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgram1, 'uNormalMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram1, 'uSampler'),
    },
  };
  const programInfo2 = {
    program: shaderProgram2,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram2, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram2, 'aVertexColor'),
      vertexNormal: gl.getAttribLocation(shaderProgram2, 'aVertexNormal'),
      textureCoordLocation: gl.getAttribLocation(shaderProgram2, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram2, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram2, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgram2, 'uNormalMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram2, 'uSampler'),
    },
  };
  const programInfo3 = {
    program: shaderProgram3,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram3, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram3, 'aVertexColor'),
      vertexNormal: gl.getAttribLocation(shaderProgram3, 'aVertexNormal'),
      textureCoordLocation: gl.getAttribLocation(shaderProgram3, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram3, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram3, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgram3, 'uNormalMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram3, 'uSampler'),
    },
  };
  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  //const buffers = initBuffers(gl);
  var then = 0;

  // Draw the scene repeatedly
  function render(now)
  {
    now *= 0.001;  // convert to seconds
    deltaTime = now - then;
    then = now;
    move(now);
    if(gray_scale)
    {
      drawScene(gl, programInfo2, deltaTime, programInfo3); 
    }
    else
    {
      drawScene(gl, programInfo, deltaTime, programInfo1);
    }
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

function drawScene(gl, programInfo, deltaTime, programInfo1)
{
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 1000.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);
  //coin.rotation += deltaTime;
  player.Player_Move(player.pos);
  track.drawCube(gl, projectionMatrix, programInfo, deltaTime);
  player.drawCube(gl, projectionMatrix, programInfo, deltaTime);
  if(count>0)
  {
      wall.drawCube(gl, projectionMatrix, programInfo, deltaTime);
  }
  else
  {
    wall.drawCube1(gl, projectionMatrix, programInfo1, deltaTime); 

  }
  count--;
  if(count<-100)
  {
    count=100;
  }
  for(let i=0; i<2;i++)
  {
    jumpboost_draw[i].drawCube(gl, projectionMatrix, programInfo, deltaTime);
    jumper_boost[i].drawCube(gl, projectionMatrix, programInfo, deltaTime);
  }
  //train_sides.drawCube(gl, projectionMatrix, programInfo, deltaTime); 
  for(let i=0; i<10; i++)
  {
    coins_draw[i].drawCube(gl, projectionMatrix, programInfo, deltaTime);
    coins_up[i].drawCube(gl, projectionMatrix, programInfo, deltaTime);
    arrows_draw[i].drawCube(gl, projectionMatrix, programInfo, deltaTime);
    uparrows_draw[i].drawCube(gl, projectionMatrix, programInfo, deltaTime);
    trains_draw[i].drawCube(gl, projectionMatrix, programInfo, deltaTime);  
    //console.log(coins_draw[i].pos);
  }
  //coin.drawCube(gl, projectionMatrix, programInfo, deltaTime);
  // arrow.drawCube(gl, projectionMatrix, programInfo, deltaTime);
  police.drawCube(gl, projectionMatrix, programInfo, deltaTime);
  //cubeRotation += deltaTime;
}

function initShaderProgram(gl, vsSource, fsSource)
{
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  let shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
  {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

function loadShader(gl, type, source)
{
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
  {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}
function move(now)
{
   track.pos[2] = track.pos[2] + 0.1;
   wall.pos[2] = wall.pos[2] + 0.1;
   for(let i=0; i<2; i++)
   {
      jumpboost_draw[i].pos[2] += 0.1;
      jumper_boost[i].pos[2] += 0.1;
      if(jumpboost_draw[i].pos[2]+0.1>=0)
      {
         jumpboost_draw[i].pos[2] -= 40;
      }
      if( detect_collision( jumpboost_draw[i], player )  )
      {
          fly_boost = 1;
          //console.log(mkb);
          player.jump_speed = 0.2;
          jumpboost_draw[i].pos[2] -= 40;
          fly_height = 2;
          prev = now;
          //console.log("JUmp"+prev);
      }
      if( detect_collision( jumper_boost[i], player ) )
      {
          jumper_boost[i].pos[2] -= 50;
          player.jump_speed += 0.1;
          prev1 = now;
      }
      if(jumper_boost[i].pos[2]+0.1>=0)
      {
        jumper_boost[i].pos[2] -= 50;
      }
   }
  if(now-prev>10 && fly_boost==2)
  {
    jump_flag = 2;
    duck_rotate = 0.05;
    player.jump_speed = -0.2;
    console.log('some');
  }
  if( now-prev1>10 && prev1!=0)
  {
     player.jump_speed = 0.2;
  }
   if(fly_boost==1)
   {
      player.pos[1] = player.pos[1] + player.jump_speed;
      if(player.pos[1]>fly_height)
      {
          //player.pos[1] = initial_height;
          //player.jump_speed = 0.2;
          fly_boost = 2;
          player.jump_speed = -0.2;
          player.pos[1] = Math.round(player.pos[1]);
          player.rotation -= Math.PI/2;
      }
      //player.jump_speed -= 0.015;
   }
   if(police_flag)
   {
     police.pos[2] -= police_speed;
     if(police.pos[2]+police_speed<-6)
     {
        police_flag = 0;
        police_speed = 0.01;
     }
   }
   else
   {
      if(police.pos[2]+police_speed>0)
      {
          police.pos[2] = 0;
          police_speed = 0;
      }
      police.pos[2] = police.pos[2] + police_speed;
   }
   if(duck_flag)
   {
      if(player.rotation>Math.PI/2)
      {
        duck_rotate = -0.05;
      }
      if(player.rotation < 0)
      {
        duck_flag = 0;
        player.rotation = 0;
        duck_rotate = 0.05;
        console.log(1);
      }
      console.log(player.rotation);
      player.rotation += duck_rotate;
   }
   if(jump_flag==1)
   {
      player.pos[1] = player.pos[1] + player.jump_speed;
      if( detect_collision(track, player)  )
      {
        //press_fl = 0;
        player.pos[1] = track.pos[1];
        player.jump_speed = 0.2;
        jump_flag = 0;
        player.pos[1] = Math.round(10*player.pos[1])/10;
      }
      for(let i=0; i<10; i++)
      {
        if(  t_collsion_top(trains_draw[i], player, trains_draw[i].top) )
        {
          player.pos[1] = -2+trains_draw[i].height;
        }
      }
      player.jump_speed -= 0.015;
   }
   //console.log("Jump Flag:"+jump_flag);
   if(jump_flag==2)
   {
      player.jump_speed = -0.2;
      player.pos[1] = player.pos[1] + player.jump_speed;
      console.log(player.pos[1]);
      if(player.rotation>0)
      {
         player.rotation = 0;
         jump_flag = 0;
      }
      if(detect_collision(track, player))
      {
         player.pos[1] = initial_height;
         player.jump_speed = 0.2;
         duck_rotate = 0;
         jump_flag = 0;
         player.rotation = 0;
         console.log("Jumper Flag:"+jump_flag);
         player.pos[1] = Math.round(player.pos[1]);
         fly_boost = 0;

      }
      player.jump_speed -= 0.015;
      player.rotation += duck_rotate;
   }
   if(move_player==2)
   {
      change_x += 0.1;
      if(change_x>3 || player.pos[0]>3)
      {
        //player.pos[0] = init_x+3;
        //init_x = player.pos[0];
        move_player = 0;
        change_x = 0;
        speed_x = 0;
        player.pos[0] = Math.round(player.pos[0]);
        police.pos[0] = Math.round(player.pos[0]);
      }
      player.pos[0] = player.pos[0] + speed_x;
      police.pos[0] = police.pos[0] + speed_x;
   }
   if(move_player==1)
   {
      change_x -= 0.1;
      if(change_x<-3 || player.pos[0]<-3)
      {
        //player.pos[0] = init_x - 3;
        //init_x = player.pos[0];
        move_player = 0;
        change_x = 0;
        player.pos[0] = Math.round(player.pos[0]);
        police.pos[0] = Math.round(player.pos[0]);
        speed_x = 0
      }
      player.pos[0] = player.pos[0] - speed_x;
      police.pos[0] = police.pos[0] - speed_x;
   }
   for(let i=0; i<10; i++)
   {
      if(coins_draw[i].pos[2]+0.1>=0  )
      {
        coins_draw[i].pos[2] -= 36;
        // console.log(score);
      }
      if( coins_up[i].pos[2]+0.1>=0  )
      {
        coins_up[i].pos[2] -= 10;
        // console.log(score);
      }
      if( detect_collision( coins_draw[i], player ) )
      {
         count_score++;
         score.innerHTML = 'Score:'+count_score;
         coins_draw[i].pos[2] -= 36;
      }
      if( detect_collision( coins_up[i], player ) )
      {
         count_score+=2;
         score.innerHTML = 'Score:'+count_score;
         coins_up[i].pos[2] -= 36;
      }
      if(arrows_draw[i].pos[2]+0.1>=0)
      {
        arrows_draw[i].pos[2] -= 36;
      }
      if(trains_draw[i].pos[2]+0.1>=0)
      {
        trains_draw[i].pos[2] -= 100;
      }
      if(uparrows_draw[i].pos[2]+0.1>=0)
      {
        uparrows_draw[i].pos[2] = uparrows_draw[i].pos[2] - 36;
      }
      if( !train_top && t_collsion_top(trains_draw[i], player, trains_draw[i].top) )
      {
        //jump_flag = 3;
        console.log('top collison'+player.jump_speed);
        player.pos[1] = -2 + trains_draw[i].height;
        console.log(trains_draw[i].pos[1], player.pos[1]);
        //player.jump_speed = 0.0;
        initial_height = player.pos[1];
        train_top = 1;
        jump_flag = 0;
      }
        // if(t_collsion_top(trains_draw[i], player, trains_draw[i].top) )
        // {
        //   train_top = 1;
        //   jump_flag = 0;
        //   console.log(' no top collison'+player.jump_speed);
        // }
        // else if (player.pos[1] > initial_height ) 
        // {
        //   train_top = 0;
        //   jump_flag = 1;
        // }
      else if( train_top && !detect_collision(track, player) )
      {
        //jump_flag = 0;
        console.log(' no top collison'+player.jump_speed);
        train_top = 0;
      }
      if( t_collsion_front(trains_draw[i], player, trains_draw[i].front) )
      {
        //console.log("BOOM");
        gameover();
        //return;
      }
      if( t_collsion_side(trains_draw[i], player, trains_draw[i].side) )
      {
        //console.log("KBOOM");
        police_flag = 1;   //rush to the side of player
        police_speed = 0.2;
        t.push(now);
        console.log('side collison');
        //console.log(t1[1]-t1[0]);
        if(player.pos[0]<trains_draw[i].pos[0])
        {
          move_player = 1;
        }
        else
        {
          move_player = 2;
        }
        if( t.length==2 && t[1] - t[0]<5 )
        {
            gameover();
        }
        if(t.length==2)
        {
          t.pop();
          t.pop();
        }
      }
      if( detect_collision(arrows_draw[i], player) )
      {
         gameover();
      }
      if( !duck_flag && detect_collision(uparrows_draw[i], player) )
      {
        //gameover();
        police_flag = 1;   //rush to the side of player
        police_speed = 0.2;
        //console.log(now);
        t.push(now);
        //console.log(t.length);
        if( t.length==2 && t[1] - t[0]<5 )
        {
            gameover();
        }
        if(t.length==2)
        {
          t.pop();
          t.pop();
        }
      }
      coins_draw[i].pos[2] = coins_draw[i].pos[2] + 0.1;
      arrows_draw[i].pos[2] = arrows_draw[i].pos[2] + 0.1;
      trains_draw[i].pos[2] = trains_draw[i].pos[2] + 0.2;
      uparrows_draw[i].pos[2] = uparrows_draw[i].pos[2] + 0.1;
      coins_up[i].pos[2] += 0.1;
   }
}
function getRandomInt(max)
{
    return Math.floor(Math.random() * Math.floor(max));
}
function detect_collision(object, player)
{
    var a =((2*Math.abs(object.pos[0]-player.pos[0])<object.width+player.width) &&
           (2*Math.abs(object.pos[1]-player.pos[1] + object.height/2 - player.height/2)<object.height+player.height) &&
           (2*Math.abs(object.pos[2]-player.pos[2])<object.depth+player.depth));
    return a;
}
function t_collsion_front(object, player, dim_object)
{
  //console.log(dim_object[0], dim_object[1]/2, dim_object[2]);
  var a =((2*Math.abs(object.pos[0]-player.pos[0])<dim_object[0]+player.width) &&
         (2*Math.abs(object.pos[1]-player.pos[1] + dim_object[1]/2 - player.height/2)<dim_object[1]+player.height) &&
         (2*Math.abs(object.pos[2]-player.pos[2] + 4 - dim_object[2]/2 )<dim_object[2]+player.depth));
  return a;
}
function t_collsion_side(object, player, dim_object)
{
  // console.log(dim_object[0], dim_object[1]/2, dim_object[2]);
  // console.log(object.pos[0]);
  // console.log(object.pos[0] - 0.4);
  var offset;
  if(player.pos[0]<object.pos[0])
  {
    offset = -0.4;
  }
  else
  {
    offset = 0.4;
  }
  var a =( ( 2*Math.abs(object.pos[0]-player.pos[0] + offset + dim_object[0]/2)<dim_object[0]+player.width ) &&
         (2*Math.abs(object.pos[1]-player.pos[1] + dim_object[1]/2 - player.height/2)<dim_object[1]+player.height) &&
         (2*Math.abs(object.pos[2]-player.pos[2] )<dim_object[2]+player.depth));
  return a;
}
function t_collsion_top(object, player, dim_object)
{
  // console.log(dim_object[0], dim_object[1]/2, dim_object[2]);
  var a = ( ( 2*Math.abs(object.pos[0]-player.pos[0]) < dim_object[0]+player.width ) &&
         ( 2*Math.abs( object.pos[1]-player.pos[1] + 1.2 - player.height/2 ) < dim_object[1]+player.height) &&
         ( 2*Math.abs(object.pos[2]-player.pos[2] ) < dim_object[2]+player.depth ) );
  return a;
}
function gameover()
{
  document.getElementById('glcanvas').remove();
  var img = document.createElement('img');
  img.src = './game_over.png';
  img.alt = 'Game Over';
  img.height = '800';
  img.width = '1440';
  document.getElementById('gameover').appendChild(img);
}