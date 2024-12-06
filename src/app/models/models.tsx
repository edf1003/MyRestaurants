export class Restaurant {
  constructor(
    public id: string,
    public name: string,
    public category: string,
    public location: string,
    public image: string,
    public description: string,
    public rating: number
  ) {}
}
