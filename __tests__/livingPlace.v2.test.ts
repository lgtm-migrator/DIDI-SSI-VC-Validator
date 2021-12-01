const { createSemicolonClassElement } = require('typescript');

const jwt = require('jsonwebtoken');
const { jwtDecode } = require('jwt-decode');
const {validateCredential} = require('../src/validator');
import { livingPlace } from "../src/schemas/livingPlace"

const valid = { 
    iat: 123456,
    sub: "1232123",
    vc: {
        "@context":["https://www.w3.org/2018/credentials/v1" ],
        type: ["VerifiableCredential"],
        credentialSubject: {
            "Vivienda" :{
                data:{
                    credentialName: "Certificado" ,
                    livingPlaceStatus: "Tipo de tenencia" ,
                    livingPlaceType: "Tipo de vivienda" ,
                    locationType: "Tipo de barrio" ,
                    district: "Distrito de Residencia" ,
                    neighborhood: "Barrio" ,
                    livingPlaceGeneralConditions: "Condiciones Generales" ,
                    livingPlaceGasNetwork: "Red de gas" ,
                    livingPlaceCarefe:"Garrafa" ,
                    livingPlaceWaterNetwork:"Red de Agua" ,
                    livingPlaceWellPump:"Pozo/Bomba" ,
                    livingPlaceElectricityGrid:"Instalacion de Luz" ,
                    givenName:"Nombre" ,
                    familyName: "Apellido" 
                },
                category: "livingPlace",
                preview: {
                    type: 1,
                    fields: ["credentialName", "livingPlaceStatus", "livingPlaceType", "locationType", "district", "neighborhood", "livingPlaceGeneralConditions", "livingPlaceGasNetwork", "livingPlaceCarefe", "livingPlaceWaterNetwork", "livingPlaceWellPump", "livingPlaceElectricityGrid", "givenName", "familyName"]
                }
            },
        },
    },
    iss: "did:ethr:0x2b184203babefe306901a76b053bc38659e4a795"
}

const validJWT = jwt.sign(valid, "livingPlaceKey");

test('Validate ok', async () => {
    const result = await validateCredential(livingPlace.v2, validJWT);
    expect(result.status).toBe(true);
    expect(result.errors).toBe(null);
});

//INVALID SUB

const invalidSub = { 
    iat: 123456,
    sub: 1232123,
    vc: {
        "@context":["https://www.w3.org/2018/credentials/v1" ],
        type: ["VerifiableCredential"],
        credentialSubject: {
            "Vivienda" :{
                data:{
                    credentialName: "Certificado" ,
                    livingPlaceStatus: "Tipo de tenencia" ,
                    livingPlaceType: "Tipo de vivienda" ,
                    locationType: "Tipo de barrio" ,
                    district: "Distrito de Residencia" ,
                    neighborhood: "Barrio" ,
                    livingPlaceGeneralConditions: "Condiciones Generales" ,
                    livingPlaceGasNetwork: "Red de gas" ,
                    livingPlaceCarefe:"Garrafa" ,
                    livingPlaceWaterNetwork:"Red de Agua" ,
                    livingPlaceWellPump:"Pozo/Bomba" ,
                    livingPlaceElectricityGrid:"Instalacion de Luz" ,
                    givenName:"Nombre" ,
                    familyName: "Apellido" 
                },
                category: "livingPlace",
                preview: {
                    type: 1,
                    fields: ["credentialName", "livingPlaceStatus", "livingPlaceType", "locationType", "district", "neighborhood", "livingPlaceGeneralConditions", "livingPlaceGasNetwork", "livingPlaceCarefe", "livingPlaceWaterNetwork", "livingPlaceWellPump", "livingPlaceElectricityGrid", "givenName", "familyName"]
                }
            },
        },
    },
    iss: "did:ethr:0x2b184203babefe306901a76b053bc38659e4a795"
}

const invalidSubJWT = jwt.sign(invalidSub, "livingPlaceKey");

test('Validate sub field FAIL', async() => {
    const result = await validateCredential(livingPlace.v2, invalidSubJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe('.sub');
    expect(result.errors[0].schemaPath).toBe('#/properties/sub/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });

//INVALID ISS

const invalidIss = { 
    iat: 123456,
    sub: "1232123",
    vc: {
        "@context":["https://www.w3.org/2018/credentials/v1" ],
        type: ["VerifiableCredential"],
        credentialSubject: {
            "Vivienda" :{
                data:{
                    credentialName: "Certificado" ,
                    livingPlaceStatus: "Tipo de tenencia" ,
                    livingPlaceType: "Tipo de vivienda" ,
                    locationType: "Tipo de barrio" ,
                    district: "Distrito de Residencia" ,
                    neighborhood: "Barrio" ,
                    livingPlaceGeneralConditions: "Condiciones Generales" ,
                    livingPlaceGasNetwork: "Red de gas" ,
                    livingPlaceCarefe:"Garrafa" ,
                    livingPlaceWaterNetwork:"Red de Agua" ,
                    livingPlaceWellPump:"Pozo/Bomba" ,
                    livingPlaceElectricityGrid:"Instalacion de Luz" ,
                    givenName:"Nombre" ,
                    familyName: "Apellido" 
                },
                category: "livingPlace",
                preview: {
                    type: 1,
                    fields: ["credentialName", "livingPlaceStatus", "livingPlaceType", "locationType", "district", "neighborhood", "livingPlaceGeneralConditions", "livingPlaceGasNetwork", "livingPlaceCarefe", "livingPlaceWaterNetwork", "livingPlaceWellPump", "livingPlaceElectricityGrid", "givenName", "familyName"]
                }
            },
        },
    },
    iss: 3
}

const invalidIssJWT = jwt.sign(invalidIss, "livingPlaceKey");

test('Validate iss field FAIL', async () => {
    const result = await validateCredential(livingPlace.v2, invalidIssJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe('.iss');
    expect(result.errors[0].schemaPath).toBe('#/properties/iss/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
});

//INVALID PREVIEW TYPE

const invalidPreviewType = { 
    iat: 123456,
    sub: "1232123",
    vc: {
        "@context":["https://www.w3.org/2018/credentials/v1" ],
        type: ["VerifiableCredential"],
        credentialSubject: {
            "Vivienda" :{
                data:{
                    credentialName: "Certificado" ,
                    livingPlaceStatus: "Tipo de tenencia" ,
                    livingPlaceType: "Tipo de vivienda" ,
                    locationType: "Tipo de barrio" ,
                    district: "Distrito de Residencia" ,
                    neighborhood: "Barrio" ,
                    livingPlaceGeneralConditions: "Condiciones Generales" ,
                    livingPlaceGasNetwork: "Red de gas" ,
                    livingPlaceCarefe:"Garrafa" ,
                    livingPlaceWaterNetwork:"Red de Agua" ,
                    livingPlaceWellPump:"Pozo/Bomba" ,
                    livingPlaceElectricityGrid:"Instalacion de Luz" ,
                    givenName:"Nombre" ,
                    familyName: "Apellido" 
                },
                category: "livingPlace",
                preview: {
                    type: "1",
                    fields: ["credentialName", "livingPlaceStatus", "livingPlaceType", "locationType", "district", "neighborhood", "livingPlaceGeneralConditions", "livingPlaceGasNetwork", "livingPlaceCarefe", "livingPlaceWaterNetwork", "livingPlaceWellPump", "livingPlaceElectricityGrid", "givenName", "familyName"]
                }
            },
        },
    },
    iss: "did:ethr:0x2b184203babefe306901a76b053bc38659e4a795"
}

const invalidPreviewTypeJWT = jwt.sign(invalidPreviewType, "livingPlaceKey");

test(`Validate .vc.credentialSubject.Vivienda.preview.type field FAIL`, async() =>{
    const result = await validateCredential(livingPlace.v2, invalidPreviewTypeJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(`.vc.credentialSubject.Vivienda.preview.type`);
    expect(result.errors[0].schemaPath).toBe('#/properties/vc/properties/credentialSubject/properties/Vivienda/properties/preview/properties/type/type');
    expect(result.errors[0].params.type).toBe('integer');
    expect(result.errors[0].message).toBe('should be integer');
  });


// INVALID DATA TYPE

const invalidDataType = { 
    iat: 123456,
    sub: "1232123",
    vc: {
        "@context":["https://www.w3.org/2018/credentials/v1" ],
        type: ["VerifiableCredential"],
        credentialSubject: {
            "Vivienda" :{
                data:{
                    credentialName: 123 ,
                    livingPlaceStatus: "Tipo de tenencia" ,
                    livingPlaceType: "Tipo de vivienda" ,
                    locationType: "Tipo de barrio" ,
                    district: "Distrito de Residencia" ,
                    neighborhood: "Barrio" ,
                    livingPlaceGeneralConditions: "Condiciones Generales" ,
                    livingPlaceGasNetwork: "Red de gas" ,
                    livingPlaceCarefe:"Garrafa" ,
                    livingPlaceWaterNetwork:"Red de Agua" ,
                    livingPlaceWellPump:"Pozo/Bomba" ,
                    livingPlaceElectricityGrid:"Instalacion de Luz" ,
                    givenName:"Nombre" ,
                    familyName: "Apellido" 
                },
                category: "livingPlace",
                preview: {
                    type: 1,
                    fields: ["credentialName", "livingPlaceStatus", "livingPlaceType", "locationType", "district", "neighborhood", "livingPlaceGeneralConditions", "livingPlaceGasNetwork", "livingPlaceCarefe", "livingPlaceWaterNetwork", "livingPlaceWellPump", "livingPlaceElectricityGrid", "givenName", "familyName"]
                }
            },
        },
    },
    iss: "did:ethr:0x2b184203babefe306901a76b053bc38659e4a795"
}

const invalidDataTypeJWT = jwt.sign(invalidDataType, "livingPlaceKey");

test(`Validate .vc.credentialSubject.Vivienda.data.type field FAIL`, async() =>{
    const result = await validateCredential(livingPlace.v2, invalidDataTypeJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(`.vc.credentialSubject.Vivienda.data.credentialName`);
    expect(result.errors[0].schemaPath).toBe('#/properties/vc/properties/credentialSubject/properties/Vivienda/properties/data/properties/credentialName/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });

//INVALID CATEGORY

const invalidCategory = { 
    iat: 123456,
    sub: "1232123",
    vc: {
        "@context":["https://www.w3.org/2018/credentials/v1" ],
        type: ["VerifiableCredential"],
        credentialSubject: {
            "Vivienda" :{
                data:{
                    credentialName: "Certificado" ,
                    livingPlaceStatus: "Tipo de tenencia" ,
                    livingPlaceType: "Tipo de vivienda" ,
                    locationType: "Tipo de barrio" ,
                    district: "Distrito de Residencia" ,
                    livingPlaceGeneralConditions: "Condiciones Generales" ,
                    livingPlaceGasNetwork: "Red de gas" ,
                    livingPlaceCarefe:"Garrafa" ,
                    livingPlaceWaterNetwork:"Red de Agua" ,
                    livingPlaceWellPump:"Pozo/Bomba" ,
                    livingPlaceElectricityGrid:"Instalacion de Luz" ,
                    givenName:"Nombre" ,
                    familyName: "Apellido" 
                },
                category: 1,
                preview: {
                    type: 1,
                    fields: ["credentialName", "livingPlaceStatus", "livingPlaceType", "locationType", "district", "livingPlaceGeneralConditions", "livingPlaceGasNetwork", "livingPlaceCarefe", "livingPlaceWaterNetwork", "livingPlaceWellPump", "livingPlaceElectricityGrid", "givenName", "familyName"]
                }
            },
        },
    },
    iss: "did:ethr:0x2b184203babefe306901a76b053bc38659e4a795"
}

const invalidCategoryJWT = jwt.sign(invalidCategory, "livingPlaceKey");

test(`Validate .vc.credentialSubject.Vivienda.category.type field FAIL`, async() =>{
    const result = await validateCredential(livingPlace.v2, invalidCategoryJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(`.vc.credentialSubject.Vivienda.category`);
    expect(result.errors[0].schemaPath).toBe('#/properties/vc/properties/credentialSubject/properties/Vivienda/properties/category/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });