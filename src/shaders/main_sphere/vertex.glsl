
varying vec3 vNormal;
varying vec3 vPosition;

uniform float time;
uniform vec2 mousePos;
uniform vec3 rotation;

float inverseLerp(float v, float min, float max) {
    return (v - min) / (max - min);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
    float t = inverseLerp(v, inMin, inMax);
    return mix(outMin, outMax, t);
}

mat3 rotateX(float rads) {
  float s = sin(rads);
  float c = cos(rads);
  return mat3(
    1.0, 0.0, 0.0,
    0.0, c, -s,
    0.0, s, c
  );
}
mat3 rotateY(float rads) {
  float s = sin(rads);
  float c = cos(rads);
  return mat3(
    c, 0.0, s,
    0.0, 1.0, 0.0,
    -s, 0.0, c
  );
} 
mat3 rotateZ(float rads) {
  float s = sin(rads);
  float c = cos(rads);
  return mat3(
    c, -s, 0.0,
    s, c, 0.0,
    0.0, 0.0, 1.0
  );
} 

void main() {	
    // rotations
    mat3 xRotation = rotateX(rotation.x);
    mat3 yRotation = rotateY(rotation.y);
    mat3 zRotation = rotateZ(rotation.z);

    vec3 localPosition = vec3(position);
    float t = sin(localPosition.y * 5.0 + time * 3.0);
    t = remap(t, -1.0, 1.0, 0.0, 0.45);

    localPosition += normal * t;
    localPosition += normal * pow(max(0.0, dot(normal * xRotation * yRotation * zRotation, vec3(normalize(mousePos), 0.0))), 8.0);
    localPosition += normal * pow(max(0.0, dot(normal, vec3(normalize(mousePos), 0.0))), 32.0) * 0.2;
    localPosition = localPosition * xRotation * yRotation * zRotation;
    vec3 rotatedNormal = normal * xRotation * yRotation * zRotation;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(localPosition, 1.0);

    vNormal = (modelMatrix * vec4(rotatedNormal, 0.0)).xyz; // normals in world space
    vPosition = (vec4(localPosition, 1.0)).xyz;
  
    }