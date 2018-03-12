json.user do
  json.extract! @user, :id, :band_name, :email, :band_description, :band_location, :band_website
  json.image_url asset_path(@user.image.url)
  json.album_ids do
    (json.array! (@user.albums.map { |album| album.id }))
  end
  json.most_recent_album @user.most_recent_album.id
end


json.albums do
  @user.albums.each do |album|
    json.set! album.id do
      if album == @user.most_recent_album
        json.extract! album, :id, :title, :description, :artist_id
        json.image_url asset_path(album.image.url)
        json.track_ids do
          (json.array! (album.tracks.map { |track| track.id }))
        end
      else
        json.extract! album, :id, :title, :description, :artist_id
        json.image_url asset_path(album.image.url)
      end
    end
  end
end

json.tracks do
  @user.most_recent_album.tracks.each do |track|
    json.set! track.id do
        json.extract! track, :id, :title, :order, :album_id
    end
  end
end
