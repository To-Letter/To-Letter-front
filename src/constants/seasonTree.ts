/**
 * 계절 관련 연결 파일 경로를 담는 변수
 * @param name 구분 이름
 * @param modelPath .obj확장자 models 경로
 * @param texturePath .mtl확장자 재질 경로
 * @param scale 모델별 크기
 */
export interface seasonFileI {
  modelPath: string,
  texturePath: string,
  scale: number
  color: string
  floorColor: string
}

export interface seasonFilesI {
  winter: seasonFileI
  spring: seasonFileI
  summer: seasonFileI
  autumn: seasonFileI
}



export const treePosition: number[][] = [
  [37, -25, -66],
  [34, -23, -70],
  [34, -24, -55],
  [37, -28, -19],
  [42, -26, -8],
  [40, -24, -28],
  [43, -26, -21],
  [39, -25, -25],
  [40, -25, -12],
  [39, -27, -2],
  [41, -29, -43],
  [43, -26, -30],
  [39, -25, -32],
  [38, -26, -53],
  [38, -24, -39],
  [39, -27, -36],
  [41, -29, -50],

  
  [37, -29, -5],
  [40, -28, -9],
  [38, -27, -13],
  [37, -29, 0],
  [39, -27, 2],

]

export const seasonFile: seasonFilesI = {
  winter: {
    modelPath: "/models/winterTree.glb",
    texturePath: "/texture/scenery/treeTexture1.png",
    scale: 0.008,
    color: "#2f3335",
    floorColor:"#324233"
  },
  spring: {
    modelPath: "/models/summerTree.obj",
    texturePath: "/models/springTree.mtl",
    scale: 0.21,
    color: "#576403",
    floorColor:""
  },
  summer: {
    modelPath: "/models/summerTree.obj",
    texturePath: "/models/summerTree.mtl",
    scale: 0.21,
    color: "#2a3f01",
    floorColor:""
  },
  autumn: {
    modelPath: "/models/summerTree.obj",
    texturePath: "/models/autumnTree.mtl",
    scale: 0.21,
    color: "#925115",
    floorColor:""
  },
};