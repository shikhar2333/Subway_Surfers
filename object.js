var jump_flag = 0, move_player = 0, speed_x, duck_flag = 0, gray_scale = false, fly_boost = 0, duck_rotate =0;
var cnt = 0;
class object 
{
    constructor(gl, pos, position_buffer, texture_buffer, indices_buffer, image)
    {
        this.rotation = 0;
        this.pos = pos;
        this.height = 0;
        this.width = 0;
        this.depth = 0;
        this.texture =  loadTexture(gl, image);
        //position_buffer
        this.modelViewMatrix = mat4.create();
        this.positionBuffer = gl.createBuffer();
        this.position_buffer = position_buffer;
        this.texture_buffer = texture_buffer;
        this.indices_buffer = indices_buffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);
    
        //index_buffer
        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices_buffer), gl.STATIC_DRAW);

        //texture_buffer
        const textureBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texture_buffer), gl.STATIC_DRAW);

        this.buffers = {
            position: this.positionBuffer,
            textureCoord: textureBuffer,
            indices: indexBuffer,
        }

    }

    drawCube(gl, projectionMatrix, programInfo, deltaTime)
    {
        const modelViewMatrix = mat4.create();
        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            this.pos
        );

        //this.rotation += Math.PI / (((Math.random()) % 100) + 50);

        mat4.rotate(modelViewMatrix,
            modelViewMatrix,
            this.rotation,
            [1, 0, 0]);
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexPosition);
        }
        {
            const num = 2; // every coordinate composed of 2 values
            const type = gl.FLOAT; // the data in the buffer is 32 bit float
            const normalize = false; // don't normalize
            const stride = 0; // how many bytes to get from one set to the next
            const offset = 0; // how many bytes inside the buffer to start from
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.textureCoord);
            gl.vertexAttribPointer(programInfo.attribLocations.textureCoordLocation, num, type, normalize, stride, offset);
            gl.enableVertexAttribArray(programInfo.attribLocations.textureCoordLocation);
        }
        
        gl.activeTexture(gl.TEXTURE0);

        // Bind the texture to texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
    
        // // Tell the shader we bound the texture to texture unit 0
        // gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
        


        // Tell WebGL which indices to use to index the vertices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);

        // Tell WebGL to use our program when drawing

        gl.useProgram(programInfo.program);

        // Set the shader uniforms

        gl.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);

        {
            var vertexCount = this.position_buffer.length/2;
            //console.log(vertexCount);
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }

    }
}
function loadTexture(gl, url)
{
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
      
        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 1;
        const height = 1;
        const border = 0;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;
        const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                      width, height, border, srcFormat, srcType,
                      pixel);
      
        const image = new Image();
        image.onload = function() {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                            srcFormat, srcType, image);
        
            // WebGL1 has different requirements for power of 2 images
            // vs non power of 2 images so check if the image is a
            // power of 2 in both dimensions.
            if (isPowerOf2(image.width) && isPowerOf2(image.height))
            {
                // Yes, it's a power of 2. Generate mips.
                gl.generateMipmap(gl.TEXTURE_2D);
            } 
            else 
            {
                // No, it's not a power of 2. Turn off mips and set
                // wrapping to clamp to edge
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        };
        image.src = url;
      
        return texture;
}
function loadTexture2(gl, url)
{
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
      
        const level = 0;
        const internalFormat = gl.LUMINANCE;
        const width = 1;
        const height = 1;
        const border = 0;
        const srcFormat = gl.LUMINANCE;
        const srcType = gl.UNSIGNED_BYTE;
        const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                      width, height, border, srcFormat, srcType,
                      pixel);
      
        const image = new Image();
        image.onload = function() {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                            srcFormat, srcType, image);
        
            // WebGL1 has different requirements for power of 2 images
            // vs non power of 2 images so check if the image is a
            // power of 2 in both dimensions.
            if (isPowerOf2(image.width) && isPowerOf2(image.height))
            {
                // Yes, it's a power of 2. Generate mips.
                gl.generateMipmap(gl.TEXTURE_2D);
            } 
            else 
            {
                // No, it's not a power of 2. Turn off mips and set
                // wrapping to clamp to edge
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        };
        image.src = url;
      
        return texture;
}
function  isPowerOf2(value)
{
    return (value & (value - 1)) == 0;
}
class Player extends object
{
    constructor(gl, pos, position_buffer, texture_buffer, indices_buffer, image)
    {
        super(gl, pos, position_buffer, texture_buffer, indices_buffer, image);
        this.jump_speed = 0.2;
    }   
    Player_Move(player_pos)
    {
        Mousetrap.bind('a', function()
            {
                //player_pos[0] = player_pos[0] - 3;
                move_player = 1;
                speed_x = 0.1;
            } 
        );
        Mousetrap.bind('d', function()
            {
                //player_pos[0] = player_pos[0] + 3;
                move_player = 2;
                speed_x = 0.1;
            } 
        );
        Mousetrap.bind('space', function()
            {
                jump_flag = 1;
                //press_fl = 1;
                //main();
                if (train_top == 1)
                {
                    train_top = 0;
                }
            }
        );
        Mousetrap.bind('s', function()
            {
                //player_pos[0] = player_pos[0] + 3;
                duck_flag = 1;
                duck_rotate = 0.05;
            } 
        );
        Mousetrap.bind('g', function()
            {
                //player_pos[0] = player_pos[0] + 3;
                cnt++;
                gray_scale = !gray_scale;
                //console.log(gray_scale);
            } 
        );
    }
}
class Track extends object
{
    constructor(gl, pos, position_buffer, texture_buffer, indices_buffer, image)
    {
        super(gl, pos, position_buffer, texture_buffer, indices_buffer, image);
    } 
    Track_Move(player_speed)
    {
        this.pos[2] = this.pos[2] + player_speed;   
    }
}
class Train extends object
{
    constructor(gl, pos, position_buffer, texture_buffer, indices_buffer, image)
    {
        super(gl, pos, position_buffer, texture_buffer, indices_buffer, image);
        this.front = [0.8, 1.2, 0.0];
        this.side = [0.0, 1.2, 8];
        this.top = [0.8, 0.0, 8];
    } 
}
class Coin extends object
{
    constructor(gl, pos, position_buffer, texture_buffer, indices_buffer, image)
    {
        super(gl, pos, position_buffer, texture_buffer, indices_buffer, image);
    }
}
function getRandomInt(max)
{
    return Math.floor(Math.random() * Math.floor(max));
}

// light walls
class Wall 
{
    constructor(gl, pos, position_buffer, texture_buffer, indices_buffer, image)
    {
        this.rotation = 0;
        this.pos = pos;
        this.height = 0;
        this.width = 0;
        this.depth = 0;
        this.texture =  loadTexture(gl, image);
        //position_buffer
        this.modelViewMatrix = mat4.create();
        this.positionBuffer = gl.createBuffer();
        this.position_buffer = position_buffer;
        this.texture_buffer = texture_buffer;
        this.indices_buffer = indices_buffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);
    
        //index_buffer
        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices_buffer), gl.STATIC_DRAW);

        //texture_buffer
        const textureBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texture_buffer), gl.STATIC_DRAW);
        
        //normal buffer
        const normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
      
        var vertexNormals = [
          // Left
           0.0,  0.0,  0.0,
           0.0,  0.0,  0.0,
           0.0,  0.0,  0.0,
           0.0,  0.0,  0.0,
      
          // Right
           0.0,  0.0, 0.0,
           0.0,  0.0, 0.0,
           0.0,  0.0, 0.0,
           0.0,  0.0, 0.0,
        ];
        for(let i=1; i<1000; i++)
        {
            vertexNormals.push(
                0.0,  0.0,  0.0,
                0.0,  0.0,  0.0,
                0.0,  0.0,  0.0,
                0.0,  0.0,  0.0,
            
                // Right
                0.0,  0.0, 0.0,
                0.0,  0.0, 0.0,
                0.0,  0.0, 0.0,
                0.0,  0.0, 0.0,
            );
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
                      gl.STATIC_DRAW);

        this.buffers = {
            position: this.positionBuffer,
            textureCoord: textureBuffer,
            normal: normalBuffer,
            indices: indexBuffer,
        }

    }

    drawCube1(gl, projectionMatrix, programInfo1, deltaTime)
    {
        const modelViewMatrix = mat4.create();
        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            this.pos
        );
        const normalMatrix = mat4.create();
        mat4.invert(normalMatrix, modelViewMatrix);
        mat4.transpose(normalMatrix, normalMatrix);

        //this.rotation += Math.PI / (((Math.random()) % 100) + 50);

        mat4.rotate(modelViewMatrix,
            modelViewMatrix,
            this.rotation,
            [1, 0, 0]);
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position);
            gl.vertexAttribPointer(
                programInfo1.attribLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo1.attribLocations.vertexPosition);
        }
        {
            const num = 2; // every coordinate composed of 2 values
            const type = gl.FLOAT; // the data in the buffer is 32 bit float
            const normalize = false; // don't normalize
            const stride = 0; // how many bytes to get from one set to the next
            const offset = 0; // how many bytes inside the buffer to start from
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.textureCoord);
            gl.vertexAttribPointer(programInfo1.attribLocations.textureCoordLocation, num, type, normalize, stride, offset);
            gl.enableVertexAttribArray(programInfo1.attribLocations.textureCoordLocation);
        }
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.normal);
            gl.vertexAttribPointer(
                programInfo1.attribLocations.vertexNormal,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo1.attribLocations.vertexNormal);
        }
        
        gl.activeTexture(gl.TEXTURE0);

        // Bind the texture to texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
    
        // Tell the shader we bound the texture to texture unit 0
        //gl.uniform1i(programInfo1.uniformLocations.uSampler, 0);
        


        // Tell WebGL which indices to use to index the vertices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);

        // Tell WebGL to use our program when drawing

        gl.useProgram(programInfo1.program);

        // Set the shader uniforms

        gl.uniformMatrix4fv(
            programInfo1.uniformLocations.projectionMatrix,
            false,
            projectionMatrix);
        gl.uniformMatrix4fv(
            programInfo1.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);
        gl.uniformMatrix4fv(
            programInfo1.uniformLocations.normalMatrix,
            false,
            normalMatrix);

        {
            var vertexCount = this.position_buffer.length/2;
            //console.log(vertexCount);
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }

    }
    drawCube(gl, projectionMatrix, programInfo1, deltaTime)
    {
        const modelViewMatrix = mat4.create();
        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            this.pos
        );

        //this.rotation += Math.PI / (((Math.random()) % 100) + 50);

        mat4.rotate(modelViewMatrix,
            modelViewMatrix,
            this.rotation,
            [1, 0, 0]);
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position);
            gl.vertexAttribPointer(
                programInfo1.attribLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo1.attribLocations.vertexPosition);
        }
        {
            const num = 2; // every coordinate composed of 2 values
            const type = gl.FLOAT; // the data in the buffer is 32 bit float
            const normalize = false; // don't normalize
            const stride = 0; // how many bytes to get from one set to the next
            const offset = 0; // how many bytes inside the buffer to start from
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.textureCoord);
            gl.vertexAttribPointer(programInfo1.attribLocations.textureCoordLocation, num, type, normalize, stride, offset);
            gl.enableVertexAttribArray(programInfo1.attribLocations.textureCoordLocation);
        }
        
        gl.activeTexture(gl.TEXTURE0);

        // Bind the texture to texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
    
        // Tell the shader we bound the texture to texture unit 0
        //gl.uniform1i(programInfo1.uniformLocations.uSampler, 0);
        


        // Tell WebGL which indices to use to index the vertices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);

        // Tell WebGL to use our program when drawing

        gl.useProgram(programInfo1.program);

        // Set the shader uniforms

        gl.uniformMatrix4fv(
            programInfo1.uniformLocations.projectionMatrix,
            false,
            projectionMatrix);
        gl.uniformMatrix4fv(
            programInfo1.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);

        {
            var vertexCount = this.position_buffer.length/2;
            //console.log(vertexCount);
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }

    }
}