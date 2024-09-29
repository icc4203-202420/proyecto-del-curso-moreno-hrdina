class API::V1::EventPicturesController < ApplicationController
    before_action :authenticate_user!
  
    def create
      event = Event.find(params[:event_id])
      event_picture = event.event_pictures.build(event_picture_params)
      event_picture.user = current_user
  
      if event_picture.save
        render json: { message: 'Image uploaded successfully', event_picture: event_picture }, status: :created
      else
        render json: { errors: event_picture.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def index
      event = Event.find(params[:event_id])
      event_pictures = event.event_pictures.with_attached_image
  
      pictures_data = event_pictures.map do |event_picture|
        {
          id: event_picture.id,
          image_url: url_for(event_picture.image),
          user_name: event_picture.user.name # Si quieres mostrar el nombre del usuario que subió la imagen
        }
      end
  
      render json: pictures_data, status: :ok
    end
  
    private
  
    def event_picture_params
      params.require(:event_picture).permit(:image) # Permitir solo la imagen
    end
  end
  