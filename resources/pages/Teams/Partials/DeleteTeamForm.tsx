import ActionSection from '../../../components/ActionSection';
import ConfirmationModal from '../../../components/ConfirmationModal';
import DangerButton from '../../../components/DangerButton';
import SecondaryButton from '../../../components/SecondaryButton';
import { Team } from '../../../types';
import { useForm } from '@inertiajs/react';
import clsx from 'clsx';
import React, { useState } from 'react';

interface Props {
  team: Team;
}

export default function DeleteTeamForm({ team }: Props) {
  const [confirmingTeamDeletion, setConfirmingTeamDeletion] = useState(false);
  const form = useForm({});

  function confirmTeamDeletion() {
    setConfirmingTeamDeletion(true);
  }

  function deleteTeam() {
    form.delete(route('teams.destroy', [team]), {
      errorBag: 'deleteTeam',
    });
  }

  return (
    <ActionSection
      title={'Delete Team'}
      description={'Permanently delete this team.'}
    >
      <div className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
        Once a team is deleted, all of its resources and data will be
        permanently deleted. Before deleting this team, please download any data
        or information regarding this team that you wish to retain.
      </div>

      <div className="mt-5">
        <DangerButton onClick={confirmTeamDeletion}>Delete Team</DangerButton>
      </div>

      {/* <!-- Delete Team Confirmation Modal --> */}
      <ConfirmationModal
        isOpen={confirmingTeamDeletion}
        onClose={() => setConfirmingTeamDeletion(false)}
      >
        <ConfirmationModal.Content title={'Delete Team'}>
          Are you sure you want to delete this team? Once a team is deleted, all
          of its resources and data will be permanently deleted.
        </ConfirmationModal.Content>

        <ConfirmationModal.Footer>
          <SecondaryButton onClick={() => setConfirmingTeamDeletion(false)}>
            Cancel
          </SecondaryButton>

          <DangerButton
            onClick={deleteTeam}
            className={clsx('ml-2', { 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Delete Team
          </DangerButton>
        </ConfirmationModal.Footer>
      </ConfirmationModal>
    </ActionSection>
  );
}
