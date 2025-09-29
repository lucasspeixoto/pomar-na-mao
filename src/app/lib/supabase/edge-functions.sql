CREATE OR REPLACE FUNCTION public.update_plant_and_approve(
  plant_id uuid,
  occurrences jsonb,
  inspect_routine_plant_id uuid
)
RETURNS void AS $$
BEGIN
  -- Update multiple columns in plants using JSON object
  UPDATE public.plants
  SET
    anthill = (occurrences->>'anthill')::boolean,
    broken_branch = (occurrences->>'broken_branch')::boolean,
    burnt_branch = (occurrences->>'burnt_branch')::boolean,
    drill = (occurrences->>'drill')::boolean,
    empty_collection_box_near = (occurrences->>'empty_collection_box_near')::boolean,
    fertilization_or_manuring = (occurrences->>'fertilization_or_manuring')::boolean,
    in_experiment = (occurrences->>'in_experiment')::boolean,
    is_dead = (occurrences->>'is_dead')::boolean,
    mites = (occurrences->>'mites')::boolean,
    stick = (occurrences->>'stick')::boolean,
    struck_by_lightning = (occurrences->>'struck_by_lightning')::boolean,
    thrips = (occurrences->>'thrips')::boolean,
    vine_growing = (occurrences->>'vine_growing')::boolean,
    weeds_in_the_basin = (occurrences->>'weeds_in_the_basin')::boolean,
    is_new = (occurrences->>'is_new')::boolean,
    non_existent = (occurrences->>'non_existent')::boolean,
    frost = (occurrences->>'frost')::boolean,
    flowers = (occurrences->>'flowers')::boolean,
    buds = (occurrences->>'buds')::boolean,
    dehydrated = (occurrences->>'dehydrated')::boolean,
    last_work = NOW()
  WHERE id = plant_id;

  -- Approve inspect routine plant
  UPDATE public.inspect_routines_plants
  SET is_approved = true
  WHERE id = inspect_routine_plant_id;
END;
$$ LANGUAGE plpgsql;
