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

    float mousePosDot = max(0.0,dot(normalize(localPosition.xy), normalize(mousePos)));
    mousePosDot = pow(mousePosDot, 32.0);
    localPosition += vec3(normalize(localPosition.xy), 0.0) * mousePosDot;

    localPosition += normal * pow(max(0.0, dot(normal, vec3(normalize(mousePos), 0.0))), 8.0) * mousePullStrength;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(localPosition, 1.0);

    vNormal = (modelMatrix * vec4(normal, 0.0)).xyz; // normals in world space
    vPosition = (vec4(localPosition, 1.0)).xyz;
    vUvs = uv;
  
    }