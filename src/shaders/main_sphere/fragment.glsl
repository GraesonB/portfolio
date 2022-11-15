varying vec3 vNormal;

vec3 rgbToFloat(vec3 color) {
    return color / 255.0;
}

void main() {
    vec3 sphereColour = rgbToFloat(vec3(20.0, 30.0, 40.0));
    vec3 viewDir = normalize(cameraPosition - vPosition);
    // vec3 normal = normalize(vNormal);
    vec3 normal = normalize(
        cross(
            dFdx(vNormal.xyz),
            dFdy(vNormal.xyz)
        )
    );

    // lighting
    float hemiDot = clamp(0.0, 1.0, dot(up, normal));
    hemi = pow(hemiDot, 16.0) * hemi;
    float diffuseDot = max(0.0, dot(normal, -diffuseDir));
    diffuseDot *= smoothstep(0.1, 0.105, diffuseDot);
    float threeShades = mix(0.7, 1.0, step(0.4, diffuseDot)) * step(0.105, diffuseDot);
    diffuse = diffuseDot * diffuse * threeShades;

    vec3 reflection = normalize(reflect(-diffuseDir, normal));
    float specDot = max(0.0, dot(reflection, -viewDir));
    vec3 specular = vec3(pow(specDot, 64.0));
    //specular *= vec3(step(0.5, specular.x));

    float fresnelDot = 1.0 - max(0.0, dot(viewDir, normal));
    
    vec3 fresnel = vec3(pow(fresnelDot, fresnelMod));
    fresnel *= rgbToFloat(vec3(210.0, 210.0, 190.0));

    vec3 colour = fresnel + sphereColour;

    //colour = pow(lighting, vec3(1.0 / 2.2));

    gl_FragColor = vec4(vNormal, 1.0);
}