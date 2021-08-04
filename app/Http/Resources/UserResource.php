<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'test' => 'test',
            'name' =>  $this->name,
            'email' => $this->email,
            'owner' => $this->owner,
            'photo' => $this->photo,
            'deleted_at' => $this->deleted_at,
            'account' => $this->whenLoaded('account')
        ];
    }
}
