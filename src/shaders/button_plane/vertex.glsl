varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUvs;

uniform float time;
uniform vec2 mousePos;
uniform float mousePullStrength;

float inverseLerp(float v, float min, float max) {
    return (v - min) / (max - min);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
    float t = inverseLerp(v, inMin, inMax);
    return mix(outMin, outMax, t);
}

void main() {

    vec3 localPosition = vec3(position);
    float sinY = sin(localPosition.y * 5.0 + time * 3.0);
    float sinX = cos(localPosition.x * 4.0 + time * 1.0 + 53232.0);
    sinY = remap(sinY, -1.0, 1.0, 0.0, 0.75);
    sinX = remap(sinX, -1.0, 1.0, 0.0, 0.45);

    localPosition += normal * sinY * sinX;
    localPosition += normal * pow(max(0.0, dot(normal, vec3(normalize(mousePos), 0.0))), 8.0) * mousePullStrength;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(localPosition, 1.0);

    vNormal = (modelMatrix * vec4(normal, 0.0)).xyz; // normals in world space
    vPosition = (vec4(localPosition, 1.0)).xyz;
    vUvs = uv;
  
    }