import { Card } from "@/components/ui/card";

interface PlaylistCardProps {
  playlist: {
    id: string;
    name: string;
    images?: Array<{ url: string }>;
    tracks?: { total: number };
    trackCount?: number;
  };
  isSelected?: boolean;
  onClick?: () => void;
  showTrackCount?: boolean;
  variant?: "default" | "success";
}

export function PlaylistCard({
  playlist,
  isSelected,
  onClick,
  showTrackCount = true,
  variant = "default",
}: PlaylistCardProps) {
  const trackCount = playlist.trackCount || playlist.tracks?.total || 0;

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-md ${
        onClick ? "cursor-pointer" : ""
      } ${
        variant === "success"
          ? "bg-green-500/20"
          : isSelected
          ? "bg-green-500/20"
          : "bg-secondary/50 hover:bg-secondary"
      } transition-colors`}
      onClick={onClick}
    >
      <div className="h-16 w-16 rounded bg-secondary/50 overflow-hidden">
        <img
          src={playlist.images?.[0]?.url || "/images/logo.png"}
          alt={playlist.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{playlist.name}</h3>
        {showTrackCount && (
          <p className="text-sm text-muted-foreground">
            {trackCount} tracks
          </p>
        )}
      </div>
    </div>
  );
} 