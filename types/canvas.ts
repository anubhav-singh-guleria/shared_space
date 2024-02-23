
export type Color = {
    r: number,
    g: number,
    b: number
}

export type Camera = {
    x: number,
    y: number
}

export type Point = {
    x: number,
    y: number
}

export type XYWH = {
    x: number,
    y: number
    width: number,
    height: number
}

export enum LayerType  {
    Rectangle,
    Ellipse,
    Path,
    Text,
    Note
}

export type RectangleLayer = {
    type: LayerType.Rectangle
    x: number,
    y: number
    height: number
    width: number
    fill: Color
    valur?: string
}

export type EllipseLayer = {
    type: LayerType.Ellipse
    x: number,
    y: number
    height: number
    width: number
    fill: Color
    valur?: string
}

export type PathLayer = {
    type: LayerType.Path
    x: number,
    y: number
    height: number
    width: number
    fill: Color
    points: number[][]
    valur?: string
}

export type TextLayer = {
    type: LayerType.Text
    x: number,
    y: number
    height: number
    width: number
    fill: Color
    valur?: string
}

export type NoteLayer = {
    type: LayerType.Note
    x: number,
    y: number
    height: number
    width: number
    fill: Color
    valur?: string
}

export enum Side {
    Top = 1,
    Bottom = 2,
    Left = 4,
    Right = 8
}

export type CanvasState =
    | {
        mode: CanvasMode.None
    }
    | {
        mode: CanvasMode.Pressing,
        origin: Point
    }
    | {
        mode: CanvasMode.SelectionNet
        origin: Point
        current?: Point
    }
    | {
        mode: CanvasMode.Translating
        current: Point
    }
    | {
        mode: CanvasMode.Inserting
        layerType: LayerType.Ellipse | LayerType.Note | LayerType.Rectangle | LayerType.Text
    }
    | {
        mode: CanvasMode.Resizing
        initialBounds: XYWH
        corner: Side
    }
    | {
        mode: CanvasMode.Pencil
    };
    
export enum CanvasMode {
    None,
    Pressing,
    SelectionNet,
    Translating,
    Inserting,
    Resizing,
    Pencil,
};


