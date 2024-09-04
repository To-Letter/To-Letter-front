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
  [40, -25, -6],
  [37, -23, -10],
  [35, -24, 5],
  [40, -27, 0],
  [40, -26, -19],
  [40, -25, 12],
  [45, -23, -8],
  [43, -24, -28],
  [44, -27, 2],
  [46, -26, -21],
  [42, -25, -25],
  [43, -23, -12],
  [41, -24, 3],
  [42, -27, -2],
  [44, -29, -43],
  [46, -26, -30],
  [42, -25, -32],
  [43, -29, -55],
  [41, -24, -39],
  [42, -27, -36],
  [44, -30, -50],
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