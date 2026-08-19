import React from "react";
import { roomsData } from "@/data/rooms";
import { RoomCard } from "./room-card";
import { Room } from "@/types";
import { LuxuryBadge } from "@/components/shared/badge";

interface SimilarRoomsProps {
  currentRoom: Room;
}

export function SimilarRooms({ currentRoom }: SimilarRoomsProps) {
  const similarRooms = roomsData
    .filter((r) => r.id !== currentRoom.id)
    .slice(0, 3);

  return (
    <section className="py-20 border-t border-amber-500/15">
      <div className="space-y-4 mb-10 text-center sm:text-left">
        <LuxuryBadge>Alternative Sanctuaries</LuxuryBadge>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-white">
          You May Also{" "}
          <span className="font-normal italic gold-gradient-text">
            Appreciate
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {similarRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </section>
  );
}
