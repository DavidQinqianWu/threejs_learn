function createShader(gl, type, source) {
    const vertexShader = gl.createShader(type);
    gl.shaderSource(vertexShader, source);
    gl.compileShader(vertexShader);
    const success = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
    if (success) {
        return vertexShader;
    }
    console.log(gl.getShaderInfoLog(vertexShader));
    gl.deleteShader(vertexShader);
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    // 定点着色器
    gl.attachShader(program, vertexShader);
    // 片段着色器
    gl.attachShader(program, fragmentShader);
    // 程序连接起来
    gl.linkProgram(program);

    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

function main() {
    const canvas = document.createElement('canvas');
    document.getElementsByTagName('body')[0].appendChild(canvas);
    canvas.width = 400;
    canvas.height = 400;

    const gl = canvas.getContext('webgl');
    if (!gl) {
        console.log('there is no gl object');
        return;
    }

    // 1. 顶点相关
    // 1.1 把v2矩阵坐标转为v4矩阵坐标
    const vertexSource = `
        attribute vec2 a_position;
        attribute vec4 a_color;

        varying vec4 v_color;

        void main() {
            v_color = a_color;
            gl_Position = vec4(a_position, 0.0, 1.0);
        }
    `;
    // 1.2 顶点着色器
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);

    // prettier-ignore
    const positions =[
        0,0,
        0.7,0,
        0,0.5,
        0.7,0.5,
    ]

    gl.enable(gl.CULL_FACE);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // prettier-ignore
    const indices = [
        0, 1, 2,
        2, 1, 3,
    ]
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint8Array(indices),
        gl.STATIC_DRAW
    );

    // 2. 片段相关
    const fragmentSource = `
        precision mediump float;

        // uniform vec4 u_color;
        varying vec4 v_color;

        void main() {
            gl_FragColor = v_color;
        }
    `;
    // 2.1 创建片段着色器
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

    // 3. 创建程序
    const program = createProgram(gl, vertexShader, fragmentShader);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    const positionAttributeLocation = gl.getAttribLocation(
        program,
        'a_position'
    );
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // 自定义一个颜色
    const vertexColorLocation = gl.getUniformLocation(program, 'u_color');
    gl.uniform4fv(vertexColorLocation, [0.5, 0.5, 0.5, 1]);

    // 绘制三角形, 第一个从0开始,
    // gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, 0);
}

main();
