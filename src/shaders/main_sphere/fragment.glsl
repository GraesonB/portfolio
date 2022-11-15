varying vec3 vNormal;

vec3 rgbToFloat(vec3 color) {
    return color / 255.0;
}

void main() {

    gl_FragColor = vec4(vNormal, 1.0);
}