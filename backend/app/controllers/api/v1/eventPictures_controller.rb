class Api::V1::EventPicturesController < ApplicationController
    before_action :authenticate_user! # Si estás usando Devise
  
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
  
    private
  
    def event_picture_params
      params.require(:event_picture).permit(:image) # Permitir solo la imagen
    end
  end
  