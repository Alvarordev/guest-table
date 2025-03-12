"use client";

import { useState } from "react";
import { DataTable } from "./guests/data-table";
import { columns, Guest } from "./guests/columns";
import { supabase } from "@/lib/supabaseClient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [newGuestName, setNewGuestName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  // Fetch guests on component mount
  useState(() => {
    const fetchGuests = async () => {
      const { data, error } = await supabase.from("asistencias").select("*");
      
      if (error) {
        console.error("Error fetching guests:", error);
        return;
      }
      
      if (data) {
        setGuests(data);
      }
      
      setIsLoading(false);
    };

    fetchGuests();
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newGuestName.trim()) return;
    
    setIsLoading(true);
    
    const { data, error } = await supabase
      .from("asistencias")
      .insert([{ nombre: newGuestName }])
      .select();
    
    if (error) {
      console.error("Error adding guest:", error);
      setIsLoading(false);
      return;
    }
    
    if (data) {
      setGuests([...guests, ...data]);
      setNewGuestName("");
      setOpen(false);
    }
    
    setIsLoading(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col bg-background text-foreground items-center justify-items-center min-h-screen w-full p-8 pb-20">
      <h1 className="font-semibold pb-10">Lista de Invitados</h1>
      <DataTable columns={columns} data={guests} />
      <div className="flex justify-end items-end max-w-[500px] w-full pt-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="cursor-pointer border h-9 px-4 shadow-sm text-sm text-muted-foreground">
          Agregar
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Invitados</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-4">
                <Input 
                  placeholder="nombre" 
                  value={newGuestName} 
                  onChange={(e) => setNewGuestName(e.target.value)} 
                  required
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Agregando..." : "Agregar"}
                </Button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      </div>
    </div>
  );
}