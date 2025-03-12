import { ColumnDef } from "@tanstack/react-table"

export type Guest = {
    id: number
    created_at: string
    nombre: string
    acompañantes: string[]
}

export const columns: ColumnDef<Guest>[] = [
    {
        accessorKey: "nombre",
        header: "Invitados"
    },
    {
        id: "actions",
        
    }
]