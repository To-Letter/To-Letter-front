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
  [67, -30, -66],
  [64, -28, -70],
  [64, -29, -55],
  [67, -33, -19],
  [72, -31, -8],
  [70, -29, -28],
  [73, -31, -21],
  [69, -30, -25],
  [70, -30, -12],
  [69, -32, -2],
  [71, -34, -43],
  [73, -31, -30],
  [69, -30, -32],
  [68, -31, -53],
  [68, -29, -39],
  [69, -32, -36],
  [71, -34, -50],
  [67, -34, -5],
  [70, -33, -9],
  [68, -32, -13],
  [67, -34, 0],
  [69, -32, 2],
  [67, -38, -80],
  [70, -30, -86],
  [68, -36, -89],
  [67, -38, -83],
  [69, -36, -78],
]

export const grassPosition: number[][] = [
  [37, -28, -50],
  [43, -28, -50],
  [43, -29, -47],
  [42, -32, -50],
  [39, -30, -62],
  [42, -29, -59],
  [40, -27, -59],
]

export const cloudPosition: number[][] = [
  [100, 7, -40],
  [100, -1, -80],
  [100, -5, -5],
]

export const cloudRotation: number[][] = [
  [0, Math.PI/4, 0],
  [0, Math.PI/12, 0],
  [0, Math.PI/4, 0.1]
]

export const cloudScale: number[] = [
  35, 32, 30
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
    modelPath: "/models/springTree.glb",
    texturePath: "/texture/scenery/treeTexture1.png",
    scale: 0.0035,
    color: "#576403",
    floorColor:"#387a3c"
  },
  summer: {
    modelPath: "/models/springTree.glb",
    texturePath: "/texture/scenery/treeTexture1.png",
    scale: 0.0035,
    color: "#2a3f01",
    floorColor:"#205e24"
  },
  autumn: {
    modelPath: "/models/springTree.glb",
    texturePath: "/texture/scenery/treeTexture1.png",
    scale: 0.0035,
    color: "#925115",
    floorColor:"#a7a323"
  },
};