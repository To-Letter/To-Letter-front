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
  [37, -29, 60],
  [39, -27, 2],

  [70, -29, -28],
  [73, -31, -21],
  [69, -30, -25],


  [67, -38, -80],
  [70, -30, -86],
  [68, -36, -89],
  [67, -38, -83],
  [69, -36, -78],
  [67, -38, -90],
  [70, -30, -96],
  [68, -36, -99],
  [67, -38, -93],
  [69, -36, -88],
  [67, -38, -97],
  [70, -30, -103],
  [68, -36, -106],
  [67, -38, -100],
  [69, -36, -95],

  [100, -35, -86],
  [98, -41, -89],
  [97, -43, -83],
  [99, -41, -78],

  
  [127,-40,  -60],
  [127,-40,  -77],
  [124,-38,  -70],
  [124,-39,  -55],
  [132, -41, -8],
  [133, -41, -21],
  [129,-40,  -34],
  [130, -40, -16],
  [129,-42,  -4],
  [129,-40,  -32],

  [127,-36,  -118],
  [125,-37,  -124],
  [124,-36,  -145],
  [120,-37,  -156],
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


/// 일반 비 구름

export const rainPosition: number[][] = [
  [100, 5, -40],
  [100, -1, -80],
  [100, -5, -5],
  [100, 6, -120], //맨 왼쪽 구름
  [100, 12, -90],//왼쪽 기준 두번째 줄 구름
  [100, -5, -120], //맨 왼쪽 구름
  [100, 18, -60], //왼쪽 기준 두번째 줄 구름
]

export const rainRotation: number[][] = [
  [0, Math.PI/4, 0],
  [0, Math.PI/12, 0],
  [0, Math.PI/4, 0.1],
  [0, Math.PI/6, 0.1],
  [0, Math.PI/4, 0.1],
  [0.1, Math.PI/4,0],
  [0.1, Math.PI/6, 0.1],
]

export const rainScale: number[] = [
  35, 32, 30, 30, 20, 30, 25
]


export const seasonFile: seasonFilesI = {
  winter: {
    modelPath: "/models/winterTree.glb",
    texturePath: "/images/scenery/treeTexture1.png",
    scale: 0.008,
    color: "#2f3335",
    floorColor:"#324233"
  },
  spring: {
    modelPath: "/models/tree.glb",
    texturePath: "/images/scenery/treeTexture1.png",
    scale: 0.0035,
    color: "#576403",
    floorColor:"#387a3c"
  },
  summer: {
    modelPath: "/models/tree.glb",
    texturePath: "/images/scenery/treeTexture1.png",
    scale: 0.0035,
    color: "#2a3f01",
    floorColor:"#205e24"
  },
  autumn: {
    modelPath: "/models/tree.glb",
    texturePath: "/images/scenery/treeTexture1.png",
    scale: 0.072,
    color: "#925115",
    floorColor:"#a7a323"
  },
};