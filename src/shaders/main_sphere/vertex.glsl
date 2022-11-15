
varying vec3 vNormal;

float inverseLerp(float v, float min, float max) {
    return (v - min) / (max - min);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
    float t = inverseLerp(v, inMin, inMax);
    return mix(outMin, outMax, t);
}


void main() {	
    vec3 localPosition = vec3(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(localPosition, 1.0);

    vNormal = (modelMatrix * vec4(normal, 0.0)).xyz; // normals in world space
  
    }