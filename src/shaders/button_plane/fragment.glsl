varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUvs; 

uniform float fresnelMod;


vec3 rgbToFloat(vec3 color) {
    return color / 255.0;
}

void main() {
    vec3 planeColour = rgbToFloat(vec3(20.0, 40.0, 30.0));
    vec3 viewDir = normalize(cameraPosition - vPosition);
    vec3 zDir = vec3(0.0,0.0,1.0);

    


    gl_FragColor = vec4(vUvs,0.0, 1.0);
}