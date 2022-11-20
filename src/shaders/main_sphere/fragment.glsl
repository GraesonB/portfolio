varying vec3 vNormal;
varying vec3 vPosition;

uniform float fresnelMod;
uniform vec2 mousePos;

vec3 rgbToFloat(vec3 color) {
    return color / 255.0;
}

void main() {
    vec3 sphereColour = rgbToFloat(vec3(10.0, 15.0, 20.0));
    vec3 fresnelColour = rgbToFloat(vec3(210.0, 210.0, 190.0));
    vec3 viewDir = normalize(cameraPosition - vPosition);

    vec3 normal = normalize(
        cross(
            dFdx(vNormal.xyz),
            dFdy(vNormal.xyz)
        )
    );
    float mousePosDot = pow(max(0.0, dot(normal, vec3(normalize(mousePos), 0.0))), 7.0);
    vec3 mouseColour = mousePosDot * vec3(0.5,0.5,0.5) * 0.25;

    float fresnelDot = 1.0 - max(0.0, dot(viewDir, normal));
    vec3 fresnel = vec3(pow(fresnelDot, fresnelMod));
    fresnel *= fresnelColour;

    vec3 colour = fresnel + sphereColour; 
    colour =  fresnel + sphereColour + mouseColour;

    gl_FragColor = vec4(colour, 1.0);
}